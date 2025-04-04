import React from "react";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import { Hero } from "@/components/layouts/Hero";
import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Text } from "@/components/ui/typography/Text";
import aboutVideo from "/videos/about.mp4";
import { Content } from "@/components/layouts/Content";
import { TwoColumnGrid } from "@/components/ui/grid/TwoColumnGrid";
import Image from "next/image";
import profileImage from "@/assets/profile.jpg";
import { coreValues } from "@/config/site";
import { SkillsDisplay } from "@/components/features/SkillsDisplay";

// --- TypeScript Interfaces for Sanity Data ---
interface Skill {
  _id: string;
  title: string;
  description?: string; // Optional description for tooltip
  iconName?: string; // Optional icon name
}

interface SkillCategory {
  _id: string;
  title: string;
  iconName?: string; // Icon name from Sanity
  skills?: Skill[]; // Skills array might be optional or empty
}

export default async function HomePage() {
  // --- Fetch Skills Data from Sanity ---
  const client = createClient({ apiVersion, dataset, projectId, useCdn });
  const skillsQuery = `*[_type == "category"]{
    _id,
    title,
    iconName,
    "skills": *[_type == "skill" && references(^._id)]{
      _id,
      title,
      description,
      iconName
    } | order(title asc) // Order skills alphabetically
  } | order(title asc)`; // Order categories alphabetically

  let skillsData: SkillCategory[] = []; // Default to empty array
  try {
    skillsData = await client.fetch(skillsQuery);
  } catch (error) {
    console.error("Failed to fetch skills data:", error);
  }

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
                    {/* Pass fetched data to SkillsDisplay */}
                    <SkillsDisplay categories={skillsData} />
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
