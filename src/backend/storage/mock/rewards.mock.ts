import { Reward } from "@backend-types/reward.type";

export const rewardMocks: Reward[] = [
  {
    id: "1",
    img: "https://aromatherapynaturals.com/wp-content/uploads/2025/01/stylish_reusable_water_bottles.jpg", // garrafa reutilizável
    title: "Reusable Water Bottle",
    description: "A stylish eco-friendly bottle to reduce plastic waste.",
    requiredPoints: 100,
    available: false,
    used: true,
  },
  {
    id: "2",
    img: "https://ts2.mm.bing.net/th?id=OIP.YWxS9Z0_LuGf0YbNyIwkkwHaHa&pid=15.1&o=7&rm=3", // voucher/cartão
    title: "Discount Voucher",
    description: "10% off your next purchase at our partner stores.",
    requiredPoints: 200,
    available: true,
  },
  {
    id: "3",
    img: "https://ts3.mm.bing.net/th?id=OIP.b0IePsZNOrYf5OX7lHNknAHaHa&pid=15.1&o=7&rm=3", // bolsa de pano
    title: "Canvas Tote Bag",
    description: "Durable tote bag made from recycled materials.",
    requiredPoints: 150,
    available: true,
  },
  {
    id: "4",
    img: "https://ts3.mm.bing.net/th?id=OIP.AMLpITEqpmUtaRd2PRNwzgHaEc&pid=15.1&o=7&rm=3", // ingresso de cinema
    title: "Movie Ticket",
    description: "Enjoy a free movie session at selected cinemas.",
    requiredPoints: 300,
    available: true,
  },
];
