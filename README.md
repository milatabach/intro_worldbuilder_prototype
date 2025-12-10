# Worldbuilder - Audio Player

A minimalistic, dark-themed audio player with mystical visual effects. Features a glowing orb that moves around the screen while your audio plays.

## Features

- **Minimalist Dark Design**: Pure black background with elegant cyan and purple accents
- **Moving Glowing Orb**: Slowly moving purple gradient sphere that bounces around the screen
- **Audio Playback Controls**: Play/Pause buttons, progress bar, and time display
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Mystical, slow-moving effects for an elegant atmosphere

## Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling with dark theme and animations
- `script.js` - JavaScript for audio player and orb animations
- `Audio.mp3` - Audio file to play

## How to Use

1. Open `index.html` in a web browser
2. Click the PLAY button or press Space to start playback
3. Click the PAUSE button or press Space to pause
4. Use the progress bar to seek through the audio
5. Watch the glowing orb move around the screen

## Publishing to GitHub Pages

1. Create a new repository on GitHub (e.g., `galactic-realm`)
2. Push this project to your repository:
   ```bash
   git remote add origin https://github.com/yourusername/galactic-realm.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/" (root) folder
6. Click Save
7. Your site will be published at `https://yourusername.github.io/galactic-realm`

## Controls

- **Play/Pause**: Click button or press Spacebar
- **Seek**: Click on the progress bar to jump to a specific time
- **Time Display**: Shows current time and total duration

## Customization

- Modify `styles.css` to change colors and sizes
- Adjust animation speeds in `script.js` (look for `getAudioLevel()` function)
- Replace `Audio.mp3` with your own audio file

## Browser Support

Works in all modern browsers that support:
- HTML5 Canvas
- Web Audio API
- CSS3 Animations

Enjoy your mystical audio experience! ✨
