import sdk from '@asasvirtuais/airtable/sdk';

const token = 'patVjyGocBuXqNs7m.bf396fee80f11b0d2d986425b567eab8175e2c242619f895bc383e82fe0c4d20';

console.log('🚀 Testing Airtable connection...');

try {
  const client = sdk(token);
  console.log('✅ Airtable SDK initialized successfully');
  console.log('📋 Client methods:', Object.keys(client));
  
  // Test base method
  console.log('🔍 Testing base method...');
  const baseId = 'appYourBaseId'; // We'll need a real base ID from user
  const base = client.base(baseId);
  console.log('✅ Base instance created');
  console.log('📋 Base methods:', Object.keys(base));
  
} catch (error) {
  console.error('❌ Error:', error.message);
}