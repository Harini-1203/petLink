/**
 * Placeholder content for the landing page's "Featured pets" and
 * "Testimonials" sections. Featured pets on the real Home/Browse pages
 * will come from GET /pets — this file only feeds the marketing page
 * so it isn't empty before the backend is wired up.
 */
export const FEATURED_PETS = [
  {
    id: 'f1',
    name: 'Milo',
    breed: 'Golden Retriever',
    age: '2 yrs',
    location: 'Austin, TX',
    status: 'adoption',
    image: 'https://placedog.net/600/450?id=15',
  },
  {
    id: 'f2',
    name: 'Nala',
    breed: 'Domestic Shorthair',
    age: '1 yr',
    location: 'Portland, OR',
    status: 'adoption',
    image: 'https://cataas.com/cat?width=600&height=450&1',
  },
  {
    id: 'f3',
    name: 'Rocky',
    breed: 'French Bulldog',
    age: '3 yrs',
    location: 'Denver, CO',
    status: 'sale',
    price: 950,
    image: 'https://placedog.net/600/450?id=28',
  },
  {
    id: 'f4',
    name: 'Luna',
    breed: 'Maine Coon',
    age: '8 mo',
    location: 'Seattle, WA',
    status: 'sale',
    price: 400,
    image: 'https://cataas.com/cat?width=600&height=450&2',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Priya Nair',
    role: 'Adopted Buddy the beagle',
    avatar: 'https://i.pravatar.cc/150?img=47',
    quote:
      "The whole process felt safe and easy to follow. I messaged the owner, met Buddy the same week, and he's been home with us ever since.",
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Rehomed two rescue cats',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote:
      'Listing took ten minutes and I could tell serious buyers apart from the rest almost right away. Both cats found great homes within a month.',
  },
  {
    id: 't3',
    name: 'Ade Okafor',
    role: 'First-time pet owner',
    avatar: 'https://i.pravatar.cc/150?img=33',
    quote:
      'I was nervous about adopting sight unseen, but the detailed profiles and direct messaging made it feel like meeting a real person, not just a listing.',
  },
];

export const STATS = [
  { label: 'Pets rehomed', value: '12,400+' },
  { label: 'Verified owners', value: '8,100+' },
  { label: 'Cities covered', value: '180+' },
  { label: 'Avg. rating', value: '4.9/5' },
];
