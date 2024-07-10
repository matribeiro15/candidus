export default class Clock {
	private ONE_WEEK_SECONDS: 604800;
	private ONE_DAY_SECONDS: 86400;

	public getCurrentUnixTime(): number {
		return new Date().getTime();
	}

	public addOneWeek(time: number): number {
		return time + this.ONE_WEEK_SECONDS;
	}

	public addOneDay(time: number) {
		return time + this.ONE_DAY_SECONDS;
	}
}
