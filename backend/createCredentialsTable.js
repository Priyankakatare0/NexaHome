import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const createCredentialsTable = async () => {
  try {
    console.log('🔄 Creating credentials table...');

    // Use PostgreSQL client directly
    const client = new pg.Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    const createTableSQL = `

      CREATE TABLE IF NOT EXISTS public.credentials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        api_key TEXT NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT true,
        last_used TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_credentials_user_id ON public.credentials(user_id);
      CREATE INDEX IF NOT EXISTS idx_credentials_api_key ON public.credentials(api_key);
    `;

    await client.query(createTableSQL);
    console.log('✅ Credentials table created successfully!');
    
    await client.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📝 Please run this SQL in Supabase SQL Editor instead:');
    console.log(`

      CREATE TABLE IF NOT EXISTS credentials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        api_key TEXT NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT true,
        last_used TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now()
      );

      CREATE INDEX IF NOT EXISTS idx_credentials_user_id ON credentials(user_id);
      CREATE INDEX IF NOT EXISTS idx_credentials_api_key ON credentials(api_key);
    `);
  }
};

createCredentialsTable();
