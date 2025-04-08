import React from "react";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import { HeroBackground } from "@/components/layouts/HeroBackground";
import { HeroContent } from "@/components/layouts/HeroContent";
import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Text } from "@/components/ui/typography/Text";
import { Content } from "@/components/layouts/Content";
import { TwoColumnGrid } from "@/components/ui/grid/TwoColumnGrid";
import Image from "next/image";
import profileImage from "@/assets/profile.jpg";
import { coreValues } from "@/config/siteConfig"; // Updated import path
import { SkillsDisplay } from "@/components/features/SkillsDisplay";
import { BentoGrid, type BentoGridItem } from "@/components/features/BentoGrid";
import { type PortableTextBlock } from "@portabletext/types"; // Import PortableTextBlock
import aboutVideo from "../../../videos/about.mp4";

// --- TypeScript Interfaces for Sanity Data ---
interface AboutPageSkill {
  _id: string;
  title: string;
  description?: string;
  iconName?: string; // Optional icon from the skill itself
  category: {
    // Include category info directly
    _id: string;
    title: string;
    iconName?: string; // Optional icon from the category
  };
}

interface AboutPageData {
  _id: string;
  title: string;
  headline: string;
  aboutContent: PortableTextBlock[];
  bentoItems: BentoGridItem[];
}

export default async function HomePage() {
  // --- Fetch Skills Data from Sanity ---
  const client = createClient({ apiVersion, dataset, projectId, useCdn });
  // Updated query to fetch all skills and expand their category reference
  const skillsQuery = `*[_type == "skill"]{
    _id,
    title,
    description,
    iconName, // Keep skill icon if needed
    "category": category->{ // Expand the referenced category
      _id,
      title,
      iconName // Keep category icon if needed
    }
  } | order(category.title asc, title asc)`; // Order by category then skill title

  // Update the type of skillsData
  let skillsData: AboutPageSkill[] = []; // Default to empty array
  try {
    skillsData = await client.fetch(skillsQuery);
  } catch (error) {
    console.error("Failed to fetch skills data:", error);
  }

  // --- Bento Grid Items ---
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
      className: "md:col-span-2 md:row-span-1",
      imagePriority: true,
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
      className: "md:col-span-1 md:row-span-1",
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
      className: "md:col-span-1 md:row-span-1",
      imagePriority: false,
    },
  ];

  // Core Values
  const renderCoreValues = () =>
    coreValues.map((value) => (
      <OneColumnGrid key={value.title} gap={2}>
        {" "}
        <Text variant="heading">{value.title}</Text>
        <Text>{value.description}</Text>
        <Text variant="caption" className="text-pretty pb-2">
          {" "}
          {renderScriptureRefs(value.scriptureRefs)}
        </Text>
      </OneColumnGrid>
    ));

  // Core Value Scripture References
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

  // Fetch about page data
  const aboutQuery = `*[_type == "aboutPage"][0]{
    _id,
    title,
    headline,
    aboutContent,
    "bentoItems": bentoGridItems[]->{
      _id,
      title,
      description,
      imageUrl,
      imageAlt,
      href,
      className,
      imagePriority
    }
  }`;

  let aboutData: AboutPageData | null = null;
  try {
    aboutData = await client.fetch(aboutQuery);
    console.log("About page data fetched:", JSON.stringify(aboutData, null, 2));
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
  }

  return (
    <>
      {/* Split Hero Section */}
      <div className="relative">
        {/* Background Layer */}
        <HeroBackground
          videoSrc={aboutVideo}
          imageAlt="About page background video"
        />

        {/* Content Layer */}
        <HeroContent>
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
        </HeroContent>
      </div>
      {/* Use the Content component to wrap scrolling content */}
      <Content>
        <Section maxWidth="container">
          <OneColumnGrid gap={8}>
            <TwoColumnGrid firstColSpan={3} gap={8}>
              {/* Adjust Image props for better grid integration */}
              <div className="relative aspect-square w-full max-w-[300px] sm:max-w-full mx-auto sm:mx-0">
                {/* Wrap Image in a div to control aspect ratio */}
                <Image
                  src={profileImage}
                  alt="Profile photo of Jeff Ordway"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 300px, 25vw"
                  className="object-cover rounded-md"
                />
              </div>
              <OneColumnGrid gap={4}>
                <Text variant="title">About Me</Text>
                <Text variant="lead">
                  Hey, it&apos;s me, Jeff Ordway. I design and code things to
                  help you live boldly, pursue excellence, and serve
                  purposefully. My faith keeps me grounded, my grit keeps me
                  going, and my love for laughter keeps it all fun. When
                  I&apos;m not coding, you&apos;ll find me hiking trails,
                  pushing my limits at the gym, or sharing laughs with friends
                  over a meal or a game.
                </Text>
              </OneColumnGrid>
            </TwoColumnGrid>
            <Section maxWidth="container" className="px-0 sm:px-4 md:px-6">
              <BentoGrid
                items={bentoItems}
                gap="md"
                fixedAspectRatio={true}
                className="mt-4"
              />
            </Section>
            <TwoColumnGrid firstColSpan={3} gap={8}>
              <OneColumnGrid gap={8} showDividers={true}>
                <OneColumnGrid gap={4} className="pb-8">
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
                    Picture this: I&apos;m knee-deep in the chaos of the Parks
                    and Recreation office, juggling event schedules. Suddenly,
                    the door slams open, and a wild-eyed woman charges in,
                    thrusting a goose at me. &quot;It swallowed a bunch of
                    marbles!&quot; she yells. The bird is a bundle of
                    chaos—feathers ruffled, beady eyes glaring. Papers scatter,
                    coworkers gawk, and I&apos;m wrestling with this honking
                    disaster until Fish &amp; Wildlife arrives. It&apos;s
                    absurd, and I can&apos;t help but laugh. That ridiculous
                    moment taught me that resilience isn&apos;t just about grit;
                    it&apos;s about trusting God when life turns into a sitcom
                    gone wrong.
                  </Text>
                  <Text>
                    Fast forward several years, and I swapped parks for a new
                    passion: mobile design and development. After grinding
                    through late nights, I landed my dream job in Nashville,
                    Tennessee. Life felt like it was finally clicking into
                    place—until a sepsis infection blindsided me. One moment
                    everything was great; the next, I found myself flat on my
                    back in a hospital bed, tubes everywhere, with doctors
                    giving me 50-50 odds. The room smelled of bleach, monitors
                    beeped endlessly, and my body ached as if it were shutting
                    down. Staring at the cracked ceiling, I realized I had been
                    holding onto my life too tightly, thinking I could control
                    it all. I couldn&apos;t. Jesus didn&apos;t just save me
                    spiritually; He pulled me through that darkness. My faith
                    stopped being just an idea; it became my anchor.
                  </Text>
                  <Text>
                    Surviving changed everything. That hospital bed wasn&apos;t
                    a grave; it became a launchpad. A sense of purpose surged
                    within me—not just designing and coding for a paycheck, but
                    building something bigger. Now, I create digital tools to
                    help people grow—spiritually, mentally, and
                    physically—rooted in faith. It&apos;s tough and messy work,
                    but joy creeps in. Life&apos;s a wild ride—filled with goose
                    fiascoes, career highs, and near-death lows—but every twist
                    weaves into a story of guts, grace, and the steady truth:
                    God&apos;s got the wheel, and I&apos;m never alone.
                  </Text>
                </OneColumnGrid>
                <OneColumnGrid gap={8} showDividers={true}>
                  <OneColumnGrid gap={4}>
                    <Text variant="title">Skills</Text>
                    {/* Pass fetched data to SkillsDisplay, using the correct prop name */}
                    <SkillsDisplay skills={skillsData} />
                  </OneColumnGrid>
                </OneColumnGrid>
              </OneColumnGrid>
            </TwoColumnGrid>
          </OneColumnGrid>
        </Section>
      </Content>
    </>
  );
}
