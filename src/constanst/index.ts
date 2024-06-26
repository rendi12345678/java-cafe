import { Blog, Contact, NavbarLink, Product, WorkingHour } from "@/types";

const navbarLinks: NavbarLink[] = [
  {
    href: "/#hero",
    label: "Home",
  },
  {
    href: "/#about",
    label: "About",
  },
  {
    href: "/#products",
    label: "Products",
  },
  {
    href: "/#blog",
    label: "Blog",
  },
  {
    href: "/#contact",
    label: "Contact",
  },
];

const products: Product[] = [
  {
    id: 1,
    title: "Luwak Coffee",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis repudiandae,",
    price: 23,
    imgUrl: "/images/coffee1.avif",
  },
  {
    id: 2,
    title: "Luwak Coffee",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis repudiandae,",
    price: 23,
    imgUrl: "/images/coffee2.avif",
  },
  {
    id: 3,
    title: "Luwak Coffee",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis repudiandae,",
    price: 23,
    imgUrl: "/images/coffee3.avif",
  },
];

const blogs: Blog[] = [
  {
    id: 1,
    title: "This is the title",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print....",
  },
  {
    id: 2,
    title: "This is the title",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print....",
  },
  {
    id: 3,
    title: "This is the title",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print....",
  },
  {
    id: 4,
    title: "This is the title",
    description:
      "Lorem ipsum is placeholder text commonly used in the graphic, print....",
  },
];

const workingHours: WorkingHour[] = [
  {
    days: "Sunday - Thursday",
    timesOpen: "08:00am - 09:00pm",
  },
  {
    days: "Only Friday",
    timesOpen: "03:00pm - 09:00pm",
  },
  {
    days: "Saturday",
    timesOpen: "Closed",
  },
];

const contactUs: Contact[] = [
  {
    title: "Locations",
    value: "123 Coffee St.",
  },
  {
    title: "Email Address",
    value: "hardleberg@gmail.com",
  },
  {
    title: "Phone Number",
    value: "(123) 456-7860",
  },
];

export { navbarLinks, workingHours, contactUs, products, blogs };
