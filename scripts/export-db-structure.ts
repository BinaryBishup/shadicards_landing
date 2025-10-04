import { supabase } from '../src/lib/supabase';
import fs from 'fs';
import path from 'path';

async function exportDatabaseStructure() {
  console.log('Fetching database structure and sample data...\n');

  let markdown = '# Supabase Database Structure\n\n';
  markdown += `Generated: ${new Date().toISOString()}\n\n`;

  // Query weddings table
  console.log('Querying weddings table...');
  const { data: weddings, error: weddingsError } = await supabase
    .from('weddings')
    .select('*')
    .limit(2);

  if (weddingsError) {
    console.error('Error fetching weddings:', weddingsError);
  } else {
    markdown += '## Weddings Table\n\n';
    markdown += `### Sample Record Count: ${weddings?.length || 0}\n\n`;

    if (weddings && weddings.length > 0) {
      // Get column names from first record
      const columns = Object.keys(weddings[0]);
      markdown += '### Columns:\n\n';
      columns.forEach(col => {
        const value = weddings[0][col];
        const type = value === null ? 'null' : typeof value;
        markdown += `- **${col}**: ${type}\n`;
      });

      markdown += '\n### Sample Records:\n\n';
      weddings.forEach((wedding, index) => {
        markdown += `#### Record ${index + 1}:\n\n`;
        markdown += '```json\n';
        markdown += JSON.stringify(wedding, null, 2);
        markdown += '\n```\n\n';
      });
    }
  }

  // Query guests table for reference
  console.log('Querying guests table...');
  const { data: guests, error: guestsError } = await supabase
    .from('guests')
    .select('*')
    .limit(2);

  if (guestsError) {
    console.error('Error fetching guests:', guestsError);
  } else {
    markdown += '## Guests Table\n\n';
    markdown += `### Sample Record Count: ${guests?.length || 0}\n\n`;

    if (guests && guests.length > 0) {
      const columns = Object.keys(guests[0]);
      markdown += '### Columns:\n\n';
      columns.forEach(col => {
        const value = guests[0][col];
        const type = value === null ? 'null' : typeof value;
        markdown += `- **${col}**: ${type}\n`;
      });

      markdown += '\n### Sample Records:\n\n';
      guests.forEach((guest, index) => {
        markdown += `#### Record ${index + 1}:\n\n`;
        markdown += '```json\n';
        markdown += JSON.stringify(guest, null, 2);
        markdown += '\n```\n\n';
      });
    }
  }

  // Query events table
  console.log('Querying events table...');
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .limit(2);

  if (eventsError) {
    console.error('Error fetching events:', eventsError);
  } else {
    markdown += '## Events Table\n\n';
    markdown += `### Sample Record Count: ${events?.length || 0}\n\n`;

    if (events && events.length > 0) {
      const columns = Object.keys(events[0]);
      markdown += '### Columns:\n\n';
      columns.forEach(col => {
        const value = events[0][col];
        const type = value === null ? 'null' : typeof value;
        markdown += `- **${col}**: ${type}\n`;
      });

      markdown += '\n### Sample Records:\n\n';
      events.forEach((event, index) => {
        markdown += `#### Record ${index + 1}:\n\n`;
        markdown += '```json\n';
        markdown += JSON.stringify(event, null, 2);
        markdown += '\n```\n\n';
      });
    }
  }

  // Write to file
  const outputPath = path.join(process.cwd(), 'database-structure.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`\nDatabase structure exported to: ${outputPath}`);
}

exportDatabaseStructure().catch(console.error);
