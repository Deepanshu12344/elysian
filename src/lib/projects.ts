import bedroomAsset from '@/assets/bedroom.asset.json';
import diningAsset from '@/assets/dining.asset.json';
import studyAsset from '@/assets/study.asset.json';
import kitchenAsset from '@/assets/kitchen.asset.json';
import showroomAsset from '@/assets/showroom.asset.json';

type UploadedAsset = {
  project_id: string;
  url: string;
};

// Lovable asset pointers are relative so they work in its editor. Make them
// portable as well: previews and local development do not serve /__l5e routes.
const imageUrl = <T extends UploadedAsset>(asset: T) => ({
  ...asset,
  url: new URL(asset.url, `https://${asset.project_id}.lovableproject.com`).toString(),
});

export const bedroom = imageUrl(bedroomAsset);
export const dining = imageUrl(diningAsset);
export const study = imageUrl(studyAsset);
export const kitchen = imageUrl(kitchenAsset);
export const showroom = imageUrl(showroomAsset);
export const projects = [
  { title: 'The quiet retreat', category: 'Residential · Bedroom', image: bedroom.url, description: 'Soft textures, sculptural lighting and warm timber come together in a space made for slowing down.' },
  { title: 'A seat at the table', category: 'Residential · Dining', image: dining.url, description: 'Blue velvet, reflective panels and statement lighting. A room for gathering, beautifully.' },
  { title: 'Room for thought', category: 'Residential · Study', image: study.url, description: 'Bespoke joinery and layered lighting create a richly detailed workspace with a sense of balance.' },
  { title: 'Everyday, elevated', category: 'Residential · Kitchen', image: kitchen.url, description: 'Clean-lined cabinetry, a muted green palette and warm illumination bring intention to everyday rituals.' },
  { title: 'Material conversations', category: 'Commercial · Showroom', image: showroom.url, description: 'Contrasting finishes and tactile surfaces offer a fresh perspective on commercial spatial design.' },
];
