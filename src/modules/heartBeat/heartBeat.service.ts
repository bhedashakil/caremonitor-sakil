/**
 * HeartBeatService
 *
 */
export class HeartBeatService {
  public async processHeartBeatData(reqData: any): Promise<any> {
    const heartRateData = reqData.clinical_data.HEART_RATE.data.map(
      (item: any) => ({
        onDate: new Date(item.on_date),
        heartRate: parseInt(item.measurement),
      })
    );

    const minOnDate = heartRateData[0].onDate;
    const maxOnDate = heartRateData[heartRateData.length - 1].onDate;

    const timeSlots = this.intervals(minOnDate, maxOnDate);

    const finalRes: any = [];

    const heartRateStats = timeSlots.map((slot) => {
      const measurementsInSlot = heartRateData.filter(
        (item: any) => item.onDate >= slot.start && item.onDate < slot.end
      );
      const numMeasurements = measurementsInSlot.length;

      const minHeartRate =
        numMeasurements > 0
          ? Math.min(...measurementsInSlot.map((item: any) => item.heartRate))
          : 0;
      const maxHeartRate =
        numMeasurements > 0
          ? Math.max(...measurementsInSlot.map((item: any) => item.heartRate))
          : 0;

      finalRes.push({
        from_date: slot.start,
        to_date: slot.end,
        measurement: {
          low: minHeartRate,
          high: maxHeartRate,
        },
      });
    });

    reqData.clinical_data.HEART_RATE.data = finalRes;
    return reqData;
  }

  public intervals(minTimestamp: Date, maxTimestamp: Date) {
    const timeSlots = [];
    let slotStart = new Date(minTimestamp);
    while (slotStart <= maxTimestamp) {
      const slotEnd = new Date(slotStart.getTime() + 15 * 60000);
      timeSlots.push({ start: slotStart, end: slotEnd });
      slotStart = slotEnd;
    }

    return timeSlots;
  }
}
