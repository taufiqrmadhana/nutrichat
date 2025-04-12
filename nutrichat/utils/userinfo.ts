const API_URL = "http://192.168.137.135:8000/user";

// ========== USER ==========

export async function fetchUser(email: string) {
  const res = await fetch(`${API_URL}/user/${email}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
}

export async function createOrUpdateUser(data: {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  country: string;
}) {
  const res = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save user');
  return res.json();
}

// ========== HEALTH RECORD ==========

export async function fetchHealthRecord(email: string) {
  const res = await fetch(`${API_URL}/health_record/${email}`);
  if (!res.ok) throw new Error('Health record not found');
  return res.json();
}

export async function createOrUpdateHealthRecord(data: {
  email: string;
  weight: number;
  height: number;
  food_allergies: string;
  daily_exercises: string;
  daily_activities: string;
  medical_record: string;
}) {
  const res = await fetch(`${API_URL}/health_record`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save health record');
  return res.json();
}

// ========== INTENT ==========

export async function fetchIntent(email: string) {
  const res = await fetch(`${API_URL}/intent/${email}`);
  if (!res.ok) throw new Error('Intent not found');
  return res.json();
}

export async function createOrUpdateIntent(data: {
  email: string;
  weight_goal: number;
  general_goal: string;
  rdi: number;
}) {
  const res = await fetch(`${API_URL}/intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save intent');
  return res.json();
}

// ========== INTAKE HISTORY ==========

interface Intake {
    date: any,
    protein: number,
    carbohydrate: number,
    fat: number,
    foods: Array<string>
}

interface IntakeHistory {
    email: string,
    intakes: Array<Intake>
}

export async function fetchIntakeHistory(email: string) {
  const res = await fetch(`${API_URL}/intake/${email}`);
  if (!res.ok) throw new Error('Intake history not found');
  const result = await res.json();
  return result.intakes;
}

export async function createOrUpdateIntakeHistory(data: {
  email: string;
  intakes: {
    date: string;
    protein: number;
    carbohydrate: number;
    fat: number;
    foods: string[];
  }[];
}) {
  const res = await fetch(`${API_URL}/intake`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save intake history');
  return res.json();
}
