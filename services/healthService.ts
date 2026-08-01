interface HealthStatus {
  status: string;
  timestamp: string;
}

const getHealthStatus = (): HealthStatus => ({
  status: 'ok',
  timestamp: new Date().toISOString()
});

export { getHealthStatus };
