const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@bookvalley.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
      isActive: true
    }
  })

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Novel Books',
        slug: 'novel-books',
        description: 'Imagination, Emotion, Adventure.',
        image: '/novel3.jpg',
        displayOrder: 1
      }
    }),
    prisma.category.create({
      data: {
        name: 'Islamic Books',
        slug: 'islamic-books',
        description: 'Faith, Wisdom, and Peace.',
        image: '/islamic.jpg',
        displayOrder: 2
      }
    }),
    prisma.category.create({
      data: {
        name: 'Story Books',
        slug: 'story-books',
        description: 'Fun, Lessons, and Wonder.',
        image: '/story.jpg',
        displayOrder: 3
      }
    }),
    prisma.category.create({
      data: {
        name: 'Medical Books',
        slug: 'medical-books',
        description: 'Knowledge for Healing.',
        image: '/medical.jpg',
        displayOrder: 4
      }
    }),
    prisma.category.create({
      data: {
        name: 'Computer Books',
        slug: 'computer-books',
        description: 'Technology, Coding, and Logic.',
        image: '/computer.jpg',
        displayOrder: 5
      }
    }),
    prisma.category.create({
      data: {
        name: 'Educational Books',
        slug: 'educational-books',
        description: 'Learn, Grow, and Achieve.',
        image: '/educational.webp',
        displayOrder: 6
      }
    })
  ])

  // Create Authors
  const authors = await Promise.all([
    prisma.author.create({
      data: {
        name: 'Rizwan',
        slug: 'rizwan',
        bio: 'Popular Urdu novelist'
      }
    }),
    prisma.author.create({
      data: {
        name: 'Umera Ahmed',
        slug: 'umera-ahmed',
        bio: 'Renowned Pakistani writer'
      }
    })
  ])

  // Create Books
  const novelCategory = categories[0]
  const rizwan = authors[0]

  const books = [
    { title: 'Salaar Sikandar', image: '/SalaarSkindar.jpeg', price: 1800 },
    { title: 'Salaar Imaama', image: '/SalaarImama.jpeg', price: 1500 },
    { title: 'Aab E Hayaat', image: '/Aab_E_Hayat.jpeg', price: 1900 },
    { title: 'Peer E Kamil', image: '/Peer_E_Kamil.jpeg', price: 1400 },
    { title: 'Jaan', image: '/Jaan.jpeg', price: 2500 },
    { title: 'Omar O Ayaar', image: '/Omar_o_Ayaar.jpg', price: 2700 },
    { title: 'Beast Ka Ishq', image: '/Best-Ka-Ishq.jpg', price: 2300 },
    { title: 'Diyaar E Dil', image: '/Diyaar_E_Dil.jpg', price: 2800 },
    { title: 'Ghulam Baagh', image: '/Ghulam_Bagh.jpg', price: 2600 },
    { title: 'Khaali Asmaan', image: '/Khaali_Asmaan.jpg', price: 2400 },
    { title: 'Mera Ishq', image: '/Mera_Ishq.jpeg', price: 2900 },
    { title: 'Ye Dil Mera', image: '/Ye_Dil_Mera.webp', price: 2550 }
  ]

  for (const book of books) {
    await prisma.book.create({
      data: {
        title: book.title,
        slug: book.title.toLowerCase().replace(/\s+/g, '-'),
        author: rizwan.name,
        authorId: rizwan.id,
        category: novelCategory.name,
        categoryId: novelCategory.id,
        price: book.price,
        images: [book.image],
        coverImage: book.image,
        description: `${book.title} is an amazing Urdu novel that will captivate your heart.`,
        language: 'Urdu',
        inStock: true,
        stockQuantity: 50,
        rating: 4.5,
        reviewCount: 0,
        tags: ['urdu', 'novel', 'romance'],
        status: 'active',
        featured: true
      }
    })
  }

  // Create Settings
  await prisma.settings.create({
    data: {
      siteName: 'Book Valley',
      tagline: 'Turning Pages, Opening Minds',
      logo: '/weblogo.png',
      contact: {
        email: 'mlkrizwan213@gmail.com',
        phone: '+92 309 5693653',
        address: 'Lahore, Punjab, Pakistan'
      },
      social: {
        facebook: '#',
        instagram: '#',
        twitter: '#'
      },
      about: {
        title: 'About Book Valley',
        description: 'Your ultimate destination for novels and books'
      },
      business: {
        currency: 'PKR',
        shippingCost: 200,
        freeShippingThreshold: 3000
      }
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('\n📧 Admin Login:')
  console.log('Email: admin@bookvalley.com')
  console.log('Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
