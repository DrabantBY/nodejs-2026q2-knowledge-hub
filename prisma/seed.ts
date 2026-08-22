import bcrypt from 'bcryptjs';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { ARTICLES_DATA, CATEGORIES_DATA, COMMENTS_DATA, TAGS_DATA, USERS_DATA } from './data-seed';

const prisma = new PrismaService();

async function runSeed() {
  console.log('🌱 Seeding started...');

  const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;
  const users = await Promise.all(
    USERS_DATA.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, CRYPT_SALT),
    })),
  );
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('🚀 Users have been created successfully.');

  await prisma.category.createMany({
    data: CATEGORIES_DATA,
    skipDuplicates: true,
  });

  console.log('🚀 Categories have been created successfully.');

  await prisma.tag.createMany({
    data: TAGS_DATA,
    skipDuplicates: true,
  });

  console.log('🚀 Tags have been created successfully.');

  await Promise.all(
    ARTICLES_DATA.map(({ author, category, tags, ...data }) =>
      prisma.article.create({
        data: {
          ...data,
          user: { connect: { login: author } },
          category: { connect: { name: category } },
          tags: { connect: tags.map((name) => ({ name })) },
        },
      }),
    ),
  );

  console.log('🚀 Articles have been created');

  await Promise.all(
    COMMENTS_DATA.map(({ author, article, content }) =>
      prisma.comment.create({
        data: {
          content,
          article: { connect: { title: article } },
          user: { connect: { login: author } },
        },
      }),
    ),
  );

  console.log('🚀 Comments have been created successfully.');
  console.log('🎉 Seeding finished successfully.');
}

runSeed()
  .catch((err) => {
    console.error('📛 Seeding failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
