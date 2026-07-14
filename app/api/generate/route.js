import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, model, aspectRatio, style } = body;

    // Simulate 1.5–4s latency
    const latency = Math.floor(Math.random() * 2500) + 1500;
    await new Promise(resolve => setTimeout(resolve, latency));

    // Simulate ~1 in 15 failure (approx 7%)
    const shouldFail = Math.random() < 0.07;
    if (shouldFail) {
      return NextResponse.json(
        { error: "Generation failed due to a simulated backend error. Please try again." },
        { status: 500 }
      );
    }

    // Pick a random mock image to return
    const mockImages = [
      '/mock-assets/sample1.png',
      '/mock-assets/sample2.png',
      '/mock-assets/sample3.png'
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];

    const mockResponse = {
      id: `gen-${Math.random().toString(36).substr(2, 9)}`,
      url: randomImage,
      thumbnailUrl: randomImage,
      prompt: prompt || "Unknown prompt",
      model: model || "fomi-v2-hq",
      aspectRatio: aspectRatio || "1:1",
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
