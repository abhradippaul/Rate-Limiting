import { LEAKY_BUCKET_CAPACITY, LEAKY_BUCKET_LEAK_RATE } from "../constants";

class LeakyBucket {
  private capacity: number;
  private leakRate: number;
  private currentLevel: number;
  private lastChecked: number;

  constructor(capacity: number, leakRate: number) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.currentLevel = 0;
    this.lastChecked = Date.now();
  }

  private leak() {
    const now = Date.now();
    const timePassed = now - this.lastChecked;
    this.lastChecked = now;

    const leakedAmount = (timePassed / 1000) * this.leakRate;
    this.currentLevel = Math.max(0, this.currentLevel - leakedAmount);
  }

  public addRequest() {
    this.leak();
    if (this.currentLevel < this.capacity) {
      this.currentLevel++;
      return true;
    }
    return false;
  }
}

const leakyBucket = new LeakyBucket(
  LEAKY_BUCKET_CAPACITY,
  LEAKY_BUCKET_LEAK_RATE
);

export { leakyBucket };
