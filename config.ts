// src/config.ts

export const CONFIG = {
  password: "241215",
  recipientName: "Beautiful",
  targetDate: "2026-06-24T00:00:00",

  messages: {
    loader: ["Collecting memories...", "Preparing magic...", "Gathering smiles..."],
    cakeSequence: ["Happy Birthday Mahi❤️", "Make a wish...","Lotus bloom most beautifully in the deepest mud","You are amazing Dr Mahi"],
    gifts: [
      { message: "You are the best thing that happened to me ❤️", image: "/assets/gift1.jpeg" },
      { message: "Your smile makes everything better ❤️", image: "/assets/gift2.jpeg" },
      { message: "I am lucky to know you ❤️", image: "/assets/gift3.jpeg" },
      { message: "A virtual hug is waiting for you! 🤗", image: "/assets/gift4.jpeg" },
      { message: "Your kindness is your superpower.", image: "/assets/gift5.jpeg" },
      { message: "Angry Bird", image: "/assets/gift6.jpeg" },
      { message: "Iss saal Cup Namde!!", image: "/assets/gift7.jpeg" },
      { message: "Distinction huh", image: "/assets/gift8.jpeg" },
      { message: "Tension not, You gonna rock!", image: "/assets/gift9.jpeg" },
      { message: "Your best chapters are ahead, and you got it!", image: "/assets/gift10.jpeg"}
    ],
    storyChapters: [
      { title: "Chapter 1", text: "Once upon a time...", image: "/assets/chapter1.jpeg" },
      { title: "Chapter 2", text: "We started talking...", image: "/assets/chapter2.jpeg" },
      { title: "Chapter 3", text: "We created beautiful memories...", image: "/assets/chapter3.jpeg" },
      { title: "Chapter 4", text: "You became very special...", image: "/assets/chapter4.jpeg" },
      { title: "Chapter 5", text: "You'll be always my inspiration", image: "/assets/chapter5.jpeg" },
      { title: "Chapter 6", text: "But I have something to tell you..", image: "/assets/chapter6.jpeg" },
      { title: "Chapter 7", text: "I Hate You ❤️", image: "/assets/chapter7.jpeg"}
    ]
  },

  assets: {
    playlist: [
      { title: "Yellow", artist: "Coldplay", src: "/assets/yellow.mp3" },
      { title: "Labyrinth", artist: "Taylor Swift", src: "/assets/labyrinth.mp3" },
      { title: "Night Changes", artist: "One Direction", src: "/assets/night_changes.mp3" },
      { title: "The Night We Met", artist: "Lord Huron", src: "/assets/the_night_we_met.mp3" },
    ],
    video: "https://www.youtube.com/embed/W4VkXQXqTaE",
    friendsPhotos: ["/assets/f1.png", "/assets/f2.jpg", "/assets/f3.jpg"],
    offCampusPhotos: ["/assets/o1.webp", "/assets/o2.jpg", "/assets/o3.jpg"],
    tsitpPhotos: ["/assets/t1.jpg", "/assets/t2.jpg", "/assets/t3.jpg"]
  }
};