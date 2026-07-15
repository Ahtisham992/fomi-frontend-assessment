import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, model, aspectRatio, style, imageCount = 4 } = body;

    // Simulate 1.5–4s latency
    const latency = Math.floor(Math.random() * 2500) + 1500;
    await new Promise(resolve => setTimeout(resolve, latency));

    // Simulate ~1 in 15 failure (approx 7%) - Disabled for testing
    const shouldFail = false;
    if (shouldFail) {
      return NextResponse.json(
        { error: "Generation failed due to a simulated backend error. Please try again." },
        { status: 500 }
      );
    }

    // Pick random mock images to return based on imageCount
    const mockImagesPool = [
      '/mock-assets/sample1.png',
      '/mock-assets/sample2.png',
      '/mock-assets/sample3.png'
    ];
    
    // Convert to Number, capped between 1 and 4
    const count = Math.min(Math.max(Number(imageCount) || 1, 1), 4);
    
    // Shuffle pool and pick 'count' distinct images (if count <= pool.length)
    const shuffledPool = [...mockImagesPool].sort(() => 0.5 - Math.random());
    const generatedUrls = Array.from({ length: count }, (_, i) => shuffledPool[i % shuffledPool.length]);

    const mockResponse = {
      id: `gen-${Math.random().toString(36).substr(2, 9)}`,
      urls: generatedUrls, // Returns array of images
      url: generatedUrls[0], // Backwards compat for workspace
      thumbnailUrl: generatedUrls[0], // Backwards compat for workspace
      prompt: prompt || "Unknown prompt",
      model: model || "fomi-v2-hq",
      aspectRatio: aspectRatio || "1:1",
      style: style || "None",
      createdAt: new Date().toISOString(),
      status: "completed"
    };

    return NextResponse.json({
      data: mockResponse,
      success: true
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
