import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Force dynamic execution so Next.js does not attempt static pre-rendering at build time
export const dynamic = 'force-dynamic';

const DEFAULT_SUPABASE_URL = 'https://cqjaqbujrhgqcqygbyow.supabase.co';
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxamFxYnVqcmhncWNxeWdieW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MTM3MzIsImV4cCI6MjEwODM4OTczMn0.6lWdRrzUFfNifvu9tt0wUmc-dxzWC4I8qxdoT_CcKig';

const BACKUP_URL = 'https://glqvvenciupqxosdilsm.supabase.co';
const BACKUP_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscXZ2ZW5jaXVwcXhvc2RpbHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDk1MTAsImV4cCI6MjEwMjI4NTUxMH0.4yXp1TA5MRGf7ZfwSRMayV_iWx6m8t69J7HDKkbHILo';

function getPrimaryClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch (e) {
    return null;
  }
}

function getBackupClient() {
  const url = process.env.BACKUP_SUPABASE_URL || BACKUP_URL;
  const key = process.env.BACKUP_SUPABASE_ANON_KEY || BACKUP_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch (e) {
    return null;
  }
}

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

    // 1. Primary Supabase Insert (liberty-science)
    const primaryClient = getPrimaryClient();
    if (primaryClient) {
      try {
        const { error } = await primaryClient
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
    }

    // 2. Dual-write to Backup Active Supabase table
    const backupClient = getBackupClient();
    if (backupClient) {
      try {
        const { error: bError } = await backupClient
          .from('triple_motive_inquiries')
          .insert([inquiryRecord]);

        if (!bError) {
          storedInBackup = true;
        } else {
          console.warn('Backup Supabase notice:', bError.message);
        }
      } catch (be) {
        console.warn('Backup Supabase notice:', be);
      }
    }

    // 3. Optional local persistent backup (safe for local / server environments)
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
    } catch {
      // Vercel serverless environment has read-only filesystem; Supabase handles persistence
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry successfully registered in Triple Motive records.',
      persisted: {
        primary: storedInPrimary,
        backup: storedInBackup,
        cloud: storedInPrimary || storedInBackup,
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
