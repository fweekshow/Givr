import React from 'react';
const { tickers } = require('../data/tickers');

export default function TickerTape() {
  // Duplicate tickers for seamless infinite scroll
  const tickerList = [...tickers, ...tickers];

  return (
    <div className="w-full overflow-hidden bg-black border-t border-terminal h-12">
      <div
        className="animate-scroll whitespace-nowrap flex gap-8 py-2 hover:[animation-play-state:paused]"
        // The hover utility above pauses the animation on hover
      >
        {tickerList.map((ticker, index) => (
          <a
            key={index}
            href={ticker.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline flex-shrink-0 whitespace-nowrap"
          >
            {ticker.name}
          </a>
        ))}
      </div>
    </div>
  );
} 