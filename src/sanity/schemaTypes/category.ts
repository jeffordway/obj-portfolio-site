import { defineField, defineType } from "sanity";

// Category schema definition for Sanity Studio
export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    // Title field (required)
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // Optional description field
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    // Icon field (using Remix icon names)
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      options: {
        list: [
          // Analytics & Collaboration icons
          { title: "Analytics", value: "RiLineChartLine" },
          { title: "Collaboration", value: "RiTeamLine" },
          { title: "Chat", value: "RiChat3Line" },
          { title: "Presentation", value: "RiPresentationLine" },
          
          // Product Management icons
          { title: "Product", value: "RiProductHuntLine" },
          { title: "Task", value: "RiTaskLine" },
          { title: "Calendar", value: "RiCalendarLine" },
          { title: "Roadmap", value: "RiRoadMapLine" },
          
          // Software Development icons
          { title: "Code", value: "RiCodeSSlashFill" },
          { title: "Terminal", value: "RiTerminalBoxLine" },
          { title: "Git Branch", value: "RiGitBranchLine" },
          { title: "Database", value: "RiDatabase2Fill" },
          
          // UI/UX Design icons
          { title: "Design", value: "RiPencilRuler2Line" },
          { title: "Palette", value: "RiPaletteLine" },
          { title: "Layout", value: "RiLayoutLine" },
          { title: "User", value: "RiUserLine" },
        ],
        layout: "dropdown"
      },
      description: "Select an icon that represents this category"
    }),
  ],
});
