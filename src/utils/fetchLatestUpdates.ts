export async function fetchLatestUpdates() {
  try {
    const response = await fetch("/api/latest-updates"); // Gerçek API yolunu kullan!
    if (!response.ok) {
      throw new Error("Failed to fetch latest updates");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching updates:", error);
    return [];
  }
}
