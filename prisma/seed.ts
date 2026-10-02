import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ساخت کاربر تستی
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'مدیر کتابچی',
      username: 'admin',
      bio: 'من مدیر پلتفرم کتابچی هستم.',
    },
  })

  // ساخت چند کتاب نمونه
  const books = [
    {
      title: 'ملت عشق',
      slug: 'the-forty-rules-of-love',
      description: 'کتابی بسیار زیبا درباره عشق و عرفان.',
      isbn: '9786001111111',
      averageRating: 4.5,
      ratingsCount: 15,
    },
    {
      title: 'بوف کور',
      slug: 'the-blind-owl',
      description: 'شاهکار ادبیات معاصر ایران اثر صادق هدایت.',
      isbn: '9786002222222',
      averageRating: 4.2,
      ratingsCount: 8,
    },
  ]

  for (const book of books) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: {},
      create: book,
    })
  }

  console.log('✅ اطلاعات اولیه (Seed) با موفقیت در دیتابیس ثبت شد.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })