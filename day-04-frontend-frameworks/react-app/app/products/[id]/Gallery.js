'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({ images, title }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="gallery">
      <div className="main-image">
        <Image
          src={active}
          alt={title}
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="thumbs">
        {images.map((img) => (
          <button
            key={img}
            type="button"
            className={img === active ? 'thumb active' : 'thumb'}
            onClick={() => setActive(img)}
          >
            <Image src={img} alt="" width={70} height={70} />
          </button>
        ))}
      </div>
    </div>
  );
}