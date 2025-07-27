import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding production database");

        // Clear existing data
        await db.delete(schema.userSubscription);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challenges);
        await db.delete(schema.lessons);
        await db.delete(schema.units);
        await db.delete(schema.userProgress);
        await db.delete(schema.courses);

        // Insert courses
        // Required images: ES-Spain.svg, IN-India.svg, FR-France.svg, IT-Italy.svg, JP-Japan.svg, DE-Germany.svg
        await db.insert(schema.courses).values([
            { id: 1, title: "Spanish", imageSrc: "/ES-Spain.svg" },
            { id: 2, title: "Hindi", imageSrc: "/IN-India.svg" },
            { id: 3, title: "French", imageSrc: "/FR-France.svg" },
            { id: 4, title: "Italian", imageSrc: "/IT-Italy.svg" },
            { id: 5, title: "Japanese", imageSrc: "/JP-Japan.svg" },
            { id: 6, title: "German", imageSrc: "/DE-Germany.svg" },
        ]);

        // Insert units for all courses
        await db.insert(schema.units).values([
            // Spanish
            { id: 1, courseId: 1, title: "Unit 1", description: "Learn basics of Spanish", order: 1 },
            { id: 2, courseId: 1, title: "Unit 2", description: "Spanish conversational phrases", order: 2 },
            // Hindi
            { id: 3, courseId: 2, title: "Unit 1", description: "Learn basics of Hindi", order: 1 },
            { id: 4, courseId: 2, title: "Unit 2", description: "Hindi conversational phrases", order: 2 },
            // French
            { id: 5, courseId: 3, title: "Unit 1", description: "Learn basics of French", order: 1 },
            { id: 6, courseId: 3, title: "Unit 2", description: "French conversational phrases", order: 2 },
            // Italian
            { id: 7, courseId: 4, title: "Unit 1", description: "Learn basics of Italian", order: 1 },
            { id: 8, courseId: 4, title: "Unit 2", description: "Italian conversational phrases", order: 2 },
            // Japanese
            { id: 9, courseId: 5, title: "Unit 1", description: "Learn basics of Japanese", order: 1 },
            { id: 10, courseId: 5, title: "Unit 2", description: "Japanese conversational phrases", order: 2 },
            // German
            { id: 11, courseId: 6, title: "Unit 1", description: "Learn basics of German", order: 1 },
            { id: 12, courseId: 6, title: "Unit 2", description: "German conversational phrases", order: 2 },
        ]);

        // Insert lessons for all units
        await db.insert(schema.lessons).values([
            // Spanish Unit 1
            { id: 1, unitId: 1, order: 1, title: "Basic Nouns" },
            { id: 2, unitId: 1, order: 2, title: "Basic Verbs" },
            // Spanish Unit 2
            { id: 3, unitId: 2, order: 1, title: "Greetings" },
            // Hindi Unit 1
            { id: 4, unitId: 3, order: 1, title: "Basic Nouns" },
            { id: 5, unitId: 3, order: 2, title: "Basic Verbs" },
            // Hindi Unit 2
            { id: 6, unitId: 4, order: 1, title: "Greetings" },
            // French Unit 1
            { id: 7, unitId: 5, order: 1, title: "Basic Nouns" },
            { id: 8, unitId: 5, order: 2, title: "Basic Verbs" },
            // French Unit 2
            { id: 9, unitId: 6, order: 1, title: "Greetings" },
            // Italian Unit 1
            { id: 10, unitId: 7, order: 1, title: "Basic Nouns" },
            { id: 11, unitId: 7, order: 2, title: "Basic Verbs" },
            // Italian Unit 2
            { id: 12, unitId: 8, order: 1, title: "Greetings" },
            // Japanese Unit 1
            { id: 13, unitId: 9, order: 1, title: "Basic Nouns" },
            { id: 14, unitId: 9, order: 2, title: "Basic Verbs" },
            // Japanese Unit 2
            { id: 15, unitId: 10, order: 1, title: "Greetings" },
            // German Unit 1
            { id: 16, unitId: 11, order: 1, title: "Basic Nouns" },
            { id: 17, unitId: 11, order: 2, title: "Basic Verbs" },
            // German Unit 2
            { id: 18, unitId: 12, order: 1, title: "Greetings" },
        ]);

        // Insert challenges for all lessons
        await db.insert(schema.challenges).values([
            // Spanish Unit 1 - Lesson 1 (Nouns)
            { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'Which one is "the man"?' },
            { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: '"the man"' },
            // Spanish Unit 1 - Lesson 2 (Verbs)
            { id: 3, lessonId: 2, type: "SELECT", order: 1, question: 'Which one means "to run"?' },
            // Spanish Unit 2 - Lesson 3 (Greetings)
            { id: 4, lessonId: 3, type: "SELECT", order: 1, question: 'Which one is "hello"?' },
            // Hindi Unit 1 - Lesson 4 (Nouns)
            { id: 5, lessonId: 4, type: "SELECT", order: 1, question: 'Which one is "the book"?' },
            { id: 6, lessonId: 4, type: "ASSIST", order: 2, question: '"the book"' },
            // Hindi Unit 1 - Lesson 5 (Verbs)
            { id: 7, lessonId: 5, type: "SELECT", order: 1, question: 'Which one means "to write"?' },
            // Hindi Unit 2 - Lesson 6 (Greetings)
            { id: 8, lessonId: 6, type: "SELECT", order: 1, question: 'Which one is "hello"?' },
            // French Unit 1 - Lesson 7 (Nouns)
            { id: 9, lessonId: 7, type: "SELECT", order: 1, question: 'Which one is "the house"?' },
            { id: 10, lessonId: 7, type: "ASSIST", order: 2, question: '"the house"' },
            // French Unit 1 - Lesson 8 (Verbs)
            { id: 11, lessonId: 8, type: "SELECT", order: 1, question: 'Which one means "to eat"?' },
            // French Unit 2 - Lesson 9 (Greetings)
            { id: 12, lessonId: 9, type: "SELECT", order: 1, question: 'Which one is "hello"?' },
            // Italian Unit 1 - Lesson 10 (Nouns)
            { id: 13, lessonId: 10, type: "SELECT", order: 1, question: 'Which one is "the cat"?' },
            { id: 14, lessonId: 10, type: "ASSIST", order: 2, question: '"the cat"' },
            // Italian Unit 1 - Lesson 11 (Verbs)
            { id: 15, lessonId: 11, type: "SELECT", order: 1, question: 'Which one means "to sing"?' },
            // Italian Unit 2 - Lesson 12 (Greetings)
            { id: 16, lessonId: 12, type: "SELECT", order: 1, question: 'Which one is "hello"?' },
            // Japanese Unit 1 - Lesson 13 (Nouns)
            { id: 17, lessonId: 13, type: "SELECT", order: 1, question: 'Which one is "the dog"?' },
            { id: 18, lessonId: 13, type: "ASSIST", order: 2, question: '"the dog"' },
            // Japanese Unit 1 - Lesson 14 (Verbs)
            { id: 19, lessonId: 14, type: "SELECT", order: 1, question: 'Which one means "to walk"?' },
            // Japanese Unit 2 - Lesson 15 (Greetings)
            { id: 20, lessonId: 15, type: "SELECT", order: 1, question: 'Which one is "hello"?' },
            // German Unit 1 - Lesson 16 (Nouns)
            { id: 21, lessonId: 16, type: "SELECT", order: 1, question: 'Which one is "the tree"?' },
            { id: 22, lessonId: 16, type: "ASSIST", order: 2, question: '"the tree"' },
            // German Unit 1 - Lesson 17 (Verbs)
            { id: 23, lessonId: 17, type: "SELECT", order: 1, question: 'Which one means "to read"?' },
            // German Unit 2 - Lesson 18 (Greetings)
            { id: 24, lessonId: 18, type: "SELECT", order: 1, question: 'Which one is "hello"?' },
        ]);

        // Insert challenge options
        // Required images: man.svg, woman.svg, book.svg, house.svg, cat.svg, dog.svg, tree.svg
        // Required audio: es_man.mp3, es_woman.mp3, es_run.mp3, es_hello.mp3, hi_book.mp3, hi_house.mp3, hi_write.mp3, hi_hello.mp3,
        // fr_house.mp3, fr_book.mp3, fr_eat.mp3, fr_hello.mp3, it_cat.mp3, it_dog.mp3, it_sing.mp3, it_hello.mp3,
        // jp_dog.mp3, jp_cat.mp3, jp_walk.mp3, jp_hello.mp3, de_tree.mp3, de_house.mp3, de_read.mp3, de_hello.mp3
        await db.insert(schema.challengeOptions).values([
            // Spanish - Challenge 1 (man)
            { id: 1, challengeId: 1, imageSrc: "/man.svg", correct: true, text: "El hombre", audioSrc: "/es_man.mp3" },
            { id: 2, challengeId: 1, imageSrc: "/woman.svg", correct: false, text: "La mujer", audioSrc: "/es_woman.mp3" },
            // Spanish - Challenge 2 (man)
            { id: 3, challengeId: 2, correct: true, text: "El hombre", audioSrc: "/es_man.mp3" },
            { id: 4, challengeId: 2, correct: false, text: "La mujer", audioSrc: "/es_woman.mp3" },
            // Spanish - Challenge 3 (run)
            { id: 5, challengeId: 3, correct: true, text: "Correr", audioSrc: "/es_run.mp3" },
            { id: 6, challengeId: 3, correct: false, text: "Comer", audioSrc: "/es_eat.mp3" },
            // Spanish - Challenge 4 (hello)
            { id: 7, challengeId: 4, correct: true, text: "Hola", audioSrc: "/es_hello.mp3" },
            { id: 8, challengeId: 4, correct: false, text: "Adiós", audioSrc: "/es_goodbye.mp3" },
            // Hindi - Challenge 5 (book)
            { id: 9, challengeId: 5, imageSrc: "/book.svg", correct: true, text: "Kitab", audioSrc: "/hi_book.mp3" },
            { id: 10, challengeId: 5, imageSrc: "/house.svg", correct: false, text: "Ghar", audioSrc: "/hi_house.mp3" },
            // Hindi - Challenge 6 (book)
            { id: 11, challengeId: 6, correct: true, text: "Kitab", audioSrc: "/hi_book.mp3" },
            { id: 12, challengeId: 6, correct: false, text: "Ghar", audioSrc: "/hi_house.mp3" },
            // Hindi - Challenge 7 (write)
            { id: 13, challengeId: 7, correct: true, text: "Likhna", audioSrc: "/hi_write.mp3" },
            { id: 14, challengeId: 7, correct: false, text: "Bolo", audioSrc: "/hi_speak.mp3" },
            // Hindi - Challenge 8 (hello)
            { id: 15, challengeId: 8, correct: true, text: "Namaste", audioSrc: "/hi_hello.mp3" },
            { id: 16, challengeId: 8, correct: false, text: "Alvida", audioSrc: "/hi_goodbye.mp3" },
            // French - Challenge 9 (house)
            { id: 17, challengeId: 9, imageSrc: "/house.svg", correct: true, text: "La maison", audioSrc: "/fr_house.mp3" },
            { id: 18, challengeId: 9, imageSrc: "/book.svg", correct: false, text: "Le livre", audioSrc: "/fr_book.mp3" },
            // French - Challenge 10 (house)
            { id: 19, challengeId: 10, correct: true, text: "La maison", audioSrc: "/fr_house.mp3" },
            { id: 20, challengeId: 10, correct: false, text: "Le livre", audioSrc: "/fr_book.mp3" },
            // French - Challenge 11 (eat)
            { id: 21, challengeId: 11, correct: true, text: "Manger", audioSrc: "/fr_eat.mp3" },
            { id: 22, challengeId: 11, correct: false, text: "Courir", audioSrc: "/fr_run.mp3" },
            // French - Challenge 12 (hello)
            { id: 23, challengeId: 12, correct: true, text: "Bonjour", audioSrc: "/fr_hello.mp3" },
            { id: 24, challengeId: 12, correct: false, text: "Au revoir", audioSrc: "/fr_goodbye.mp3" },
            // Italian - Challenge 13 (cat)
            { id: 25, challengeId: 13, imageSrc: "/cat.svg", correct: true, text: "Il gatto", audioSrc: "/it_cat.mp3" },
            { id: 26, challengeId: 13, imageSrc: "/dog.svg", correct: false, text: "Il cane", audioSrc: "/it_dog.mp3" },
            // Italian - Challenge 14 (cat)
            { id: 27, challengeId: 14, correct: true, text: "Il gatto", audioSrc: "/it_cat.mp3" },
            { id: 28, challengeId: 14, correct: false, text: "Il cane", audioSrc: "/it_dog.mp3" },
            // Italian - Challenge 15 (sing)
            { id: 29, challengeId: 15, correct: true, text: "Cantare", audioSrc: "/it_sing.mp3" },
            { id: 30, challengeId: 15, correct: false, text: "Ballare", audioSrc: "/it_dance.mp3" },
            // Italian - Challenge 16 (hello)
            { id: 31, challengeId: 16, correct: true, text: "Ciao", audioSrc: "/it_hello.mp3" },
            { id: 32, challengeId: 16, correct: false, text: "Arrivederci", audioSrc: "/it_goodbye.mp3" },
            // Japanese - Challenge 17 (dog)
            { id: 33, challengeId: 17, imageSrc: "/dog.svg", correct: true, text: "Inu", audioSrc: "/jp_dog.mp3" },
            { id: 34, challengeId: 17, imageSrc: "/cat.svg", correct: false, text: "Neko", audioSrc: "/jp_cat.mp3" },
            // Japanese - Challenge 18 (dog)
            { id: 35, challengeId: 18, correct: true, text: "Inu", audioSrc: "/jp_dog.mp3" },
            { id: 36, challengeId: 18, correct: false, text: "Neko", audioSrc: "/jp_cat.mp3" },
            // Japanese - Challenge 19 (walk)
            { id: 37, challengeId: 19, correct: true, text: "Aruku", audioSrc: "/jp_walk.mp3" },
            { id: 38, challengeId: 19, correct: false, text: "Hashiru", audioSrc: "/jp_run.mp3" },
            // Japanese - Challenge 20 (hello)
            { id: 39, challengeId: 20, correct: true, text: "Konnichiwa", audioSrc: "/jp_hello.mp3" },
            { id: 40, challengeId: 20, correct: false, text: "Ja ne", audioSrc: "/jp_goodbye.mp3" },
            // German - Challenge 21 (tree)
            { id: 41, challengeId: 21, imageSrc: "/tree.svg", correct: true, text: "Der Baum", audioSrc: "/de_tree.mp3" },
            { id: 42, challengeId: 21, imageSrc: "/house.svg", correct: false, text: "Das Haus", audioSrc: "/de_house.mp3" },
            // German - Challenge 22 (tree)
            { id: 43, challengeId: 22, correct: true, text: "Der Baum", audioSrc: "/de_tree.mp3" },
            { id: 44, challengeId: 22, correct: false, text: "Das Haus", audioSrc: "/de_house.mp3" },
            // German - Challenge 23 (read)
            { id: 45, challengeId: 23, correct: true, text: "Lesen", audioSrc: "/de_read.mp3" },
            { id: 46, challengeId: 23, correct: false, text: "Schreiben", audioSrc: "/de_write.mp3" },
            // German - Challenge 24 (hello)
            { id: 47, challengeId: 24, correct: true, text: "Hallo", audioSrc: "/de_hello.mp3" },
            { id: 48, challengeId: 24, correct: false, text: "Tschüss", audioSrc: "/de_goodbye.mp3" },
        ]);

        console.log("Production seeding completed successfully");
    } catch (error) {
        console.error("Seeding error:", error);
        throw new Error("Failed to seed the production database");
    }
};

main();