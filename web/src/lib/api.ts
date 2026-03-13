export async function loadHabits(): Promise<any[]> {
  const res = await fetch(`/api/load`);
  if (!res.ok) throw new Error('Failed to load habits');
  return res.json();
}

export async function saveHabits(habits: any[]): Promise<void> {
  const res = await fetch(`/api/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ habits })
  });
  if (!res.ok) throw new Error('Failed to save habits');
}

export async function postPlan(data: { query: string; preferences?: any }): Promise<any> {
  const res = await fetch(`/api/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Plan request failed');
  return res.json();
}

export async function postInsights(data: { selection: string; context?: any }): Promise<any> {
  const res = await fetch(`/api/insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Insights request failed');
  return res.json();
}
