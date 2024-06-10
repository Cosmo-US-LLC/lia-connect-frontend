// src/SkeletonCard.js
import React from 'react';
import './CardSkeleton.scss';

const SkeletonCard = () => {
  const numberOfCards = 5;
  const cards = Array.from({ length: numberOfCards }, (_, index) => (
    <div key={index} className="skeleton-card">
      <div className="skeleton-delete"></div>
      {[...Array(6)].map((_, textIndex) => (
        <div key={textIndex} className="skeleton-text"></div>
      ))}
    </div>
  ));

  return (
    <>
      {cards}
    </>
  );
};

export default SkeletonCard;
