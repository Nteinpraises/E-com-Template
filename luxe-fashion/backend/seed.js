const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const Product  = require('./models/Product');
const User     = require('./models/User');

dotenv.config();

const products = [
  { name:"Classic Black Suit",      category:"Suits",    price:299, oldPrice:399, emoji:"🕴️", stock:15, badge:"Bestseller", rating:4.8, numReviews:124, sizes:["36","38","40","42","44","46"], colors:["#1A1714","#2C2925","#4A3728"], desc:"A timeless two-piece suit crafted from premium wool blend. Perfect for business and formal occasions." },
  { name:"Navy Pinstripe Suit",     category:"Suits",    price:349, oldPrice:null, emoji:"👔", stock:8,  badge:null,          rating:4.7, numReviews:89,  sizes:["36","38","40","42","44"],       colors:["#1A3A6B","#1A1714"],           desc:"Elegant navy pinstripe suit with a modern slim fit." },
  { name:"Charcoal Grey Suit",      category:"Suits",    price:279, oldPrice:329, emoji:"🕴️", stock:20, badge:"Sale",        rating:4.6, numReviews:67,  sizes:["38","40","42","44","46","48"], colors:["#4A4A4A","#2C2925"],           desc:"Versatile charcoal grey suit suitable for any formal event." },
  { name:"White Oxford Shirt",      category:"Shirts",   price:79,  oldPrice:null, emoji:"👕", stock:50, badge:"Bestseller", rating:4.9, numReviews:203, sizes:["S","M","L","XL","XXL"],        colors:["#FFFFFF","#F0EDE8"],           desc:"Crisp white Oxford shirt made from 100% Egyptian cotton." },
  { name:"French Blue Dress Shirt", category:"Shirts",   price:89,  oldPrice:110, emoji:"👔", stock:30, badge:null,          rating:4.7, numReviews:156, sizes:["S","M","L","XL"],              colors:["#4A7FAA","#2C5F8A"],           desc:"A sophisticated French blue dress shirt with a spread collar." },
  { name:"Black Premium T-Shirt",   category:"T-Shirts", price:45,  oldPrice:null, emoji:"👕", stock:80, badge:null,          rating:4.8, numReviews:312, sizes:["S","M","L","XL","XXL","XXXL"],colors:["#1A1714","#FFFFFF"],           desc:"Premium quality black t-shirt made from Pima cotton." },
  { name:"Grey Marl Crew Neck",     category:"T-Shirts", price:38,  oldPrice:null, emoji:"👕", stock:60, badge:null,          rating:4.5, numReviews:178, sizes:["S","M","L","XL","XXL"],        colors:["#9E9589","#4A4A4A"],           desc:"Comfortable grey marl crew neck t-shirt in a relaxed fit." },
  { name:"Slim Fit Chinos",         category:"Trousers", price:95,  oldPrice:120, emoji:"👖", stock:25, badge:"Sale",        rating:4.6, numReviews:145, sizes:["28","30","32","34","36","38"], colors:["#C9BFB0","#8B7355"],           desc:"Slim fit chino trousers in a neutral palette." },
  { name:"Classic Grey Trousers",   category:"Trousers", price:115, oldPrice:null, emoji:"👖", stock:18, badge:null,          rating:4.7, numReviews:92,  sizes:["30","32","34","36","38"],      colors:["#6B6560","#1A1714"],           desc:"Tailored grey trousers with a flat front and straight leg." },
  { name:"Premium Dark Jeans",      category:"Jeans",    price:120, oldPrice:150, emoji:"👖", stock:40, badge:"Bestseller", rating:4.8, numReviews:267, sizes:["28","30","32","34","36","38"], colors:["#1A1F3A","#4A3728"],           desc:"Premium dark wash jeans with a slim-straight fit." },
  { name:"Indigo Slim Jeans",       category:"Jeans",    price:98,  oldPrice:null, emoji:"👖", stock:35, badge:null,          rating:4.6, numReviews:189, sizes:["28","30","32","34","36"],      colors:["#3A4A7A","#1A2A5A"],           desc:"Classic indigo slim jeans for smart-casual settings." },
  { name:"Oxford Leather Loafers",  category:"Loafers",  price:185, oldPrice:220, emoji:"👞", stock:12, badge:"Sale",        rating:4.9, numReviews:98,  sizes:["40","41","42","43","44","45","46"], colors:["#4A3728","#1A1714"],      desc:"Handcrafted Oxford leather loafers with premium full-grain leather." },
  { name:"Suede Penny Loafers",     category:"Loafers",  price:155, oldPrice:null, emoji:"👞", stock:10, badge:null,          rating:4.7, numReviews:74,  sizes:["40","41","42","43","44","45"], colors:["#8B7355","#4A3728"],          desc:"Classic suede penny loafers in a rich camel shade." },
  { name:"Linen Summer Shirt",      category:"Shirts",   price:95,  oldPrice:null, emoji:"👕", stock:28, badge:null,          rating:4.5, numReviews:112, sizes:["S","M","L","XL","XXL"],        colors:["#F2EFE9","#8B7355"],           desc:"Breathable linen shirt ideal for warm weather." },
  { name:"White Graphic Tee",       category:"T-Shirts", price:42,  oldPrice:null, emoji:"👕", stock:70, badge:null,          rating:4.4, numReviews:234, sizes:["S","M","L","XL","XXL"],        colors:["#FFFFFF","#1A1714"],           desc:"Modern graphic tee with a minimalist design on premium cotton." },
  { name:"Tweed Blazer Suit",       category:"Suits",    price:459, oldPrice:549, emoji:"🕴️", stock:6,  badge:"New",         rating:4.9, numReviews:56,  sizes:["38","40","42","44","46"],       colors:["#8B7355","#6B6560"],           desc:"Distinguished tweed blazer suit with a timeless heritage pattern." },
];

const admins = [
  { name:"Admin User", email:"admin@luxe.com", password:"admin123", role:"admin" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB');

    await Product.deleteMany();
    await User.deleteMany();
    console.log('✓ Cleared existing data');

    await Product.insertMany(products);
    console.log(`✓ ${products.length} products seeded`);

    for (const admin of admins) {
  await User.create(admin);
}
    console.log('✓ Admin user created');
    console.log('  Email:    admin@luxe.com');
    console.log('  Password: admin123');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seed error:', error.message);
    process.exit(1);
  }
};

seed();