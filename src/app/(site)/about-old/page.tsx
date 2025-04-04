import React from "react";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import { Hero } from "@/components/layouts/Hero";
import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Text } from "@/components/ui/typography/Text";
import type { Metadata } from "next";
import { Content } from "@/components/layouts/Content";
import aboutVideo from "/videos/about.mp4";
import { TwoColumnGrid } from "@/components/ui/grid/TwoColumnGrid";
import { coreValues } from "@/config/site";
import { SkillsDisplay } from "@/components/features/SkillsDisplay";
import profileImage from "@/assets/profile.jpg"; // Import the image file
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/features/BentoGrid"; // Import BentoGrid

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "About Me | Jeff Ordway - Portfolio", // Replace Your Name
  description: "Learn more about my background and journey.", // Simplified description
};

// --- TypeScript Interfaces for Sanity Data ---
interface Skill {
  _id: string;
  title: string;
  description?: string; // Optional description for tooltip
}

interface SkillCategory {
  _id: string;
  title: string;
  skills: Skill[];
}

/**
 * About Page Component
 * Fetches skills data and renders the page layout.
 */
export default async function AboutOldPage() {
  // Make the component async

  // --- Fetch Skills Data from Sanity ---
  console.time("Sanity Fetch"); // <-- Add Start Timer
  const client = createClient({ apiVersion, dataset, projectId, useCdn });
  // Update query to use the correct schema type name: "category"
  const skillsQuery = `*[_type == "category"]{
    _id,
    title,
    "skills": *[_type == "skill" && references(^._id)]{
      _id,
      title,
      description
    } | order(title asc) // Order skills alphabetically
  } | order(title asc)`; // Order categories alphabetically

  let skillsData: SkillCategory[] = []; // Default to empty array
  try {
    skillsData = await client.fetch(skillsQuery);
  } catch (error) {
    console.error("Failed to fetch skills data:", error); // Log error
    // Optionally handle the error state in the UI, though SkillsDisplay handles empty array
  }
  console.timeEnd("Sanity Fetch"); // <-- Add End Timer

  // Helper function to render core values with their descriptions and scriptures
  const renderCoreValues = () =>
    coreValues.map((value) => (
      // Each value section is a grid item
      <OneColumnGrid key={value.title} gap={2}>
        {" "}
        {/* Reduced gap for tighter grouping */}
        <Text variant="heading">{value.title}</Text>
        <Text>{value.description}</Text>
        {/* Container for scripture references */}
        <Text variant="caption" className="text-pretty pb-2">
          {" "}
          {renderScriptureRefs(value.scriptureRefs)}
        </Text>
      </OneColumnGrid>
    ));

  // Helper function to render the list of scripture reference links
  const renderScriptureRefs = (refs: { text: string; url: string }[]) => {
    return refs.map((ref, index) => (
      <React.Fragment key={ref.url}>
        {" "}
        {/* Key on the fragment */}
        <a
          href={ref.url}
          target="_blank"
          rel="noopener noreferrer"
          // Added mr-1 for spacing and hover:text-foreground/80
          className="hover:underline hover:text-foreground/80 mr-1"
        >
          {ref.text}
        </a>
        {/* Add comma and non-breaking space if not the last item */}
        {index < refs.length - 1 && ",\u00A0"}
      </React.Fragment>
    ));
  };

  // --- Data for Bento Grid ---
  // TODO: Replace ALL placeholder content (images, alt, title, desc, href) with actual data!
  // --- Data for Bento Grid ---
  // TODO: Replace ALL placeholder content (images, alt, title, desc, href) with actual data!
  const bentoItems: BentoGridItem[] = [
    {
      id: 1, // Top-left, wide rectangle on desktop
      title: "Adventure Explorer",
      description:
        "I've explored the globe, hitting nearly every US state and Major League ballpark. I love chasing adventure one step at a time!",
      imageUrl: "/images/josh-hild-BIIPa5DYyD8-unsplash.jpg",
      imageAlt:
        "Jeff hiking through mountains with a backpack, representing his love for adventure and exploration",
      href: undefined,
      className: "md:col-span-2 md:row-span-1", // Rely on grid spans for shape on md+
      imagePriority: false,
    },
    {
      id: 2, // Right side, tall rectangle on desktop
      title: "Trivia Titan",
      description:
        "I once won a trivia contest by knowing the only fish that can blink — if you didn't know, it's the mudskipper!",
      imageUrl: "/images/robert-coelho-laNNTAth9vs-unsplash.jpg",
      imageAlt:
        "Close up of a board game with dice, cards and other game pieces, representing his love for trivia and trivia contests",
      href: undefined,
      className: "md:col-span-1 md:row-span-2",
      imagePriority: false,
    },
    {
      id: 3, // Bottom-left square
      title: "Defying Gravity",
      description:
        "During an intense workout, I let go of a barbell from an overhead position, thinking it'd hover—spoiler: gravity won that round!",
      imageUrl: "/images/victor-freitas-JbI04nYfaJk-unsplash.jpg",
      imageAlt:
        "Crossfit gym with a bunch of colorful Rouge Fitness plates, representing his love for fitness and athletics",
      href: undefined,
      className: "md:col-span-1 md:row-span-1", // Rely on grid spans for shape on md+
      imagePriority: false,
    },
    {
      id: 4, // Bottom-middle square
      title: "Aggressively Average",
      description:
        "In sports, I'm aggressively average — able to score, but not without tripping over my own feet.",
      imageUrl: "/images/jannes-glas-0NaQQsLWLkA-unsplash.jpg",
      imageAlt:
        "Jeff Playing Volleyball on the beach with friends at sunset, representing his love for athletics and outdoor activities",
      href: undefined,
      className: "md:col-span-1 md:row-span-1", // Rely on grid spans for shape on md+
      imagePriority: false,
    },
  ];

  return (
    <>
      {/* Fixed Hero Background */}
      <Hero videoSrc={aboutVideo}>
        <Section maxWidth="container">
          <OneColumnGrid gap={4} alignItems="center" justifyContent="center">
            <Text variant="title" align="center">
              My Journey: From Curveballs to Clarity
            </Text>
            <Text variant="subtitle" align="center">
              Hey, it&apos;s me, Jeff Ordway. I&apos;ve always approached life
              with a spirit of adventure and a sense of fun. But life throws
              curveballs, and I&apos;ve hit some unexpected roadblocks. Yet,
              through faith, I&apos;ve seen God turn those broken moments into
              purpose. My journey is about discovering clarity in chaos and
              embracing my God-given calling.
            </Text>
          </OneColumnGrid>
        </Section>
      </Hero>

      {/* Use the Content component to wrap scrolling content */}
      <Content>
        {/* About Me Section */}
        <Section maxWidth="container">
          <TwoColumnGrid firstColSpan={3} gap={8}>
            <Image
              src={profileImage}
              alt="Profile" // Consider more descriptive alt text
              width={200} // Intrinsic or desired render width
              height={200} // Intrinsic or desired render height
              priority={true} // Preload image as it's likely ATF
              sizes="(max-width: 768px) 90vw, 25vw" // Optimize for different viewports
              className="w-full max-w-[360px] mx-auto md:max-w-none md:mx-0" // Mobile: centered, max-width. Desktop: full width.
            />
            <OneColumnGrid gap={4}>
              <Text variant="title">About Me</Text>
              <Text variant="lead">
                Hey, it&apos;s me, Jeff Ordway. I design and code things to help
                you live boldly, pursue excellence, and serve purposefully. My
                faith keeps me grounded, my grit keeps me going, and my love for
                laughter keeps it all fun. When I&apos;m not coding, you&apos;ll
                find me hiking trails, pushing my limits at the gym, or sharing
                laughs with friends over a meal or a game.
              </Text>
            </OneColumnGrid>
          </TwoColumnGrid>

          {/* Bento Grid Section */}
          <div className="py-6 md:py-8"> {/* Add vertical spacing */}</div>

          {/* Mission/Vision Section */}
          <TwoColumnGrid firstColSpan={3} gap={8}>
            <OneColumnGrid gap={8} showDividers={true}>
              <OneColumnGrid gap={4} className="pb-0">
                <Text variant="title">Mission</Text>
                <Text>
                  Inspire and equip people to live boldly, serve purposefully,
                  and pursue excellence.
                </Text>
              </OneColumnGrid>
              <OneColumnGrid gap={4} className="pb-8">
                <Text variant="title">Vision</Text>
                <Text>
                  A world where men and women enthusiastically embrace their
                  God-given purpose, leaving a lasting legacy for future
                  generations.
                </Text>
              </OneColumnGrid>
              <OneColumnGrid gap={4} className="pb-8">
                <Text variant="title">Core Values</Text>
                {renderCoreValues()}
              </OneColumnGrid>
            </OneColumnGrid>

            <OneColumnGrid gap={8} showDividers={true}>
              <OneColumnGrid gap={4} className="pb-8">
                <Text variant="title">My Story</Text>
                <Text>
                  Picture this: I&apos;m knee-deep in the chaos of the Parks and
                  Recreation office, juggling event schedules. Suddenly, the
                  door slams open, and a wild-eyed woman charges in, thrusting a
                  goose at me. &quot;It swallowed a bunch of marbles!&quot; she
                  yells. The bird is a bundle of chaos—feathers ruffled, beady
                  eyes glaring. Papers scatter, coworkers gawk, and I&apos;m
                  wrestling with this honking disaster until Fish &amp; Wildlife
                  arrives. It&apos;s absurd, and I can&apos;t help but laugh.
                  That ridiculous moment taught me that resilience isn&apos;t
                  just about grit; it&apos;s about trusting God when life turns
                  into a sitcom gone wrong.
                </Text>
                <Text>
                  Fast forward several years, and I swapped parks for a new
                  passion: mobile design and development. After grinding through
                  late nights, I landed my dream job in Nashville, Tennessee.
                  Life felt like it was finally clicking into place—until a
                  sepsis infection blindsided me. One moment everything was
                  great; the next, I found myself flat on my back in a hospital
                  bed, tubes everywhere, with doctors giving me 50-50 odds. The
                  room smelled of bleach, monitors beeped endlessly, and my body
                  ached as if it were shutting down. Staring at the cracked
                  ceiling, I realized I had been holding onto my life too
                  tightly, thinking I could control it all. I couldn&apos;t.
                  Jesus didn&apos;t just save me spiritually; He pulled me
                  through that darkness. My faith stopped being just an idea; it
                  became my anchor.
                </Text>
                <Text>
                  Surviving changed everything. That hospital bed wasn&apos;t a
                  grave; it became a launchpad. A sense of purpose surged within
                  me—not just designing and coding for a paycheck, but building
                  something bigger. Now, I create digital tools to help people
                  grow—spiritually, mentally, and physically—rooted in faith.
                  It&apos;s tough and messy work, but joy creeps in. Life&apos;s
                  a wild ride—filled with goose fiascoes, career highs, and
                  near-death lows—but every twist weaves into a story of guts,
                  grace, and the steady truth: God&apos;s got the wheel, and
                  I&apos;m never alone.
                </Text>
              </OneColumnGrid>
              <OneColumnGrid gap={4}>
                <Text variant="title">Skills</Text>
                {/* Pass fetched data to SkillsDisplay */}
                <SkillsDisplay categories={skillsData} />
              </OneColumnGrid>
            </OneColumnGrid>
          </TwoColumnGrid>
        </Section>
      </Content>
    </>
  );
}
