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
import { SkillsDisplay } from "@/components/features/skills/SkillsDisplay";
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
export default async function AboutPage() { // Make the component async

  // --- Fetch Skills Data from Sanity ---
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
              Hey, I'm glad you stuck around. I love creating with joy and a
              sense of fun. But life throws curveballs, and I've hit some
              unexpected roadblocks. Yet, through faith, I've seen God turn
              those broken moments into purpose. My journey is about discovering
              clarity in chaos and embracing my God-given calling.
            </Text>
          </OneColumnGrid>
        </Section>
      </Hero>

      {/* Use the Content component to wrap scrolling content */}
      <Content>
        <Section maxWidth="container">
          <TwoColumnGrid firstColumnWidth={3}>
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
            {/* Removed the extra div that violated the TwoColumnGrid's two-child requirement */}
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
                <SkillsDisplay categoriesWithSkills={skillsData} /> 
              </OneColumnGrid>
            </OneColumnGrid>
          </TwoColumnGrid>
        </Section>
      </Content>
    </>
  );
}
