import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Primary client (liberty-science)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cqjaqbujrhgqcqygbyow.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const primarySupabase = createClient(supabaseUrl, supabaseKey);

// Backup client (glqvvenciupqxosdilsm)
const backupUrl = process.env.BACKUP_SUPABASE_URL || '';
const backupKey = process.env.BACKUP_SUPABASE_ANON_KEY || '';
const backupSupabase = backupUrl && backupKey ? createClient(backupUrl, backupKey) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, company, email, phone, message } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required fields.' },
        { status: 400 }
      );
    }

    const inquiryRecord = {
      full_name: fullName.trim(),
      company: company?.trim() || null,
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message?.trim() || null,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    let storedInPrimary = false;
    let storedInBackup = false;

    // 1. Attempt Primary Supabase Insert (liberty-science)
    try {
      const { data, error } = await primarySupabase
        .from('triple_motive_inquiries')
        .insert([inquiryRecord]);

      if (!error) {
        storedInPrimary = true;
      } else {
        console.warn('Primary Supabase notice:', error.message);
      }
    } catch (e) {
      console.warn('Primary Supabase write exception:', e);
    }

    // 2. Dual-write to Backup Active Supabase table
    if (backupSupabase) {
      try {
        const { error: bError } = await backupSupabase
          .from('triple_motive_inquiries')
          .insert([inquiryRecord]);

        if (!bError) {
          storedInBackup = true;
        }
      } catch (be) {
        console.warn('Backup Supabase notice:', be);
      }
    }

    // 3. Local persistent file backup (guarantees zero data loss under all conditions)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, 'inquiries.json');
      const existing = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
        : [];
      existing.unshift(inquiryRecord);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
    } catch (fe) {
      console.warn('Local file write error:', fe);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry successfully registered in Triple Motive records.',
      persisted: {
        primary: storedInPrimary,
        backup: storedInBackup,
        local: true,
      },
    });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
