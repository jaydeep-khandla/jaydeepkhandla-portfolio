#!/usr/bin/env node

/**
 * Database seeding script
 *
 * Usage:
 *   npx tsx scripts/seed-database.ts
 *   or
 *   node -r esbuild-register scripts/seed-database.ts
 */

import { seedDatabase } from '../src/app/libs/seedDatabase';

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    const result = await seedDatabase();

    if (result.success) {
      console.log('\n✅ ========== SEEDING COMPLETE ==========');
      console.log('Summary:');
      console.log(`  • Projects:  ${result.summary.projects}`);
      console.log(`  • Skills:    ${result.summary.skills}`);
      console.log(`  • About:     ${result.summary.about}`);
      console.log('=========================================\n');

      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Seeding failed:');
    console.error(error);
    process.exit(1);
  }
}

main();
