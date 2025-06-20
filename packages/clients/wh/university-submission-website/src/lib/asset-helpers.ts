export const loadVideo = async (videoPath: string): Promise<string | null> => {
  const assets = import.meta.glob("/src/assets/works/**/*.{mp4,webm,ogv}");
  const video = assets[videoPath];
  if (video) {
    const module = await video();
    return (module as { default: string }).default;
  }
  return null;
};
