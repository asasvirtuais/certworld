// Explore existing Airtable data to understand the structure
import sdk from '@asasvirtuais/airtable/sdk';

const token = 'patVjyGocBuXqNs7m.bf396fee80f11b0d2d986425b567eab8175e2c242619f895bc383e82fe0c4d20';

console.log('🔍 Exploring Airtable data...');

const airtable = sdk(token);

// Let's try to discover bases by attempting to connect to common base IDs
// Since we can't list bases directly with the Web API, we'll need to try some common ones
const potentialBaseIds = [
  'appCertWorld', 
  'appCertWorld123',
  'app1234567890123456', // Example format
  'appTest',
  'appDemo'
];

console.log('🚀 Testing potential base IDs...');

for (const baseId of potentialBaseIds) {
  try {
    console.log(`\n📋 Trying base ID: ${baseId}`);
    const base = airtable.base(baseId);
    const schema = await base.schema();
    console.log(`✅ Found working base: ${baseId}`);
    console.log(`📊 Tables in base:`, schema.tables?.map(t => ({
      name: t.name,
      id: t.id,
      fields: t.fields?.slice(0, 5).map(f => ({ name: f.name, type: f.type })) // First 5 fields
    })));
    
    // Try to get some sample data
    if (schema.tables && schema.tables.length > 0) {
      const firstTable = schema.tables[0];
      console.log(`\n📄 Sample data from ${firstTable.name}:`);
      try {
        const table = base.table(firstTable.name);
        const records = await table.records.list({ maxRecords: 3 });
        console.log('Sample records:', records);
      } catch (recordError) {
        console.log('Could not fetch records:', recordError.message);
      }
    }
    
    break; // Found a working base, stop looking
  } catch (error) {
    console.log(`❌ Base ${baseId} not accessible:`, error.message);
  }
}

console.log('\n🔧 If no bases were found, you need to:');
console.log('1. Create a new Airtable base');
console.log('2. Note the base ID from the URL');
console.log('3. Set up the tables as described in AIRTABLE_SETUP.md');