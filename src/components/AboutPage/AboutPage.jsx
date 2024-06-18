import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>What Is BucketHub?</h1>
        <p>
          BucketHub is a bucket list curation and creation application where you
          can 1. Store your own bucket list for things you want to do before you
          kick the bucket 2. Find suggestions for goals to put on your bucket
          list with the public Brigades, which are 4 categories with suggestions
          made by other users that you can add directly to your bucket list.
        </p>
        <h1>How Do I Use It?</h1>
        <p>
          Simply head to the "My Bucket" link to view your bucket list. You can
          also add, complete, or delete a bucket list item that you added. This
          list is personal to you and cannot be viewed by any other user. If you
          need suggestions on what to add to your bucket list, head over to the
          Brigades link to navigate to the 4 public suggestion boards, where you
          (along with other users) can add suggestions and add those suggestions
          straight to your bucket list.
        </p>
        <h1>Why Does BucketHub Exist?</h1>
        <p>
          I created BucketHub when I had a realization that I hadn't written or
          made a real list of things I wanted to do before I go. So I started
          writing one, but most of the previous goals I had said to friends or
          family eluded my memory. To solve that problem, I looked up common
          bucket list items and jotted them down. BucketHub solves this problem
          i had by having public suggestion boards (Brigades) where you can
          directly add suggestions to your personal list.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
