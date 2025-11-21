import { GoogleGenAI } from "@google/genai";
import { ExpenseItem, ScenarioState } from "../types";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getBudgetAdvice = async (
  expenses: ExpenseItem[],
  scenario: ScenarioState
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "Falta la API Key. Por favor configura tu entorno.";
  }

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const income = scenario.playerCount * scenario.monthlyFee;
  const balance = income - totalExpenses;

  const prompt = `
    Eres el Director Deportivo y Financiero de "Juventud Master". Estamos en la Planificación 2026.
    
    Contexto del Equipo:
    - Perfil: 60% Senior (+35 años), 25% (30-35), 15% Sub-30.
    - Dilema actual: ¿Competir en Senior o Todo Competidor?
    - Necesidad: Se busca contratar un DT.

    Datos Financieros Actuales (Escenario Simulado):
    - Gastos Mensuales: $${totalExpenses.toLocaleString('es-CL')}
    - Desglose: ${expenses.map(e => `${e.name} ($${e.amount.toLocaleString('es-CL')})`).join(', ')}
    - Jugadores: ${scenario.playerCount}
    - Cuota Mensual: $${scenario.monthlyFee.toLocaleString('es-CL')}
    - Ingresos: $${income.toLocaleString('es-CL')}
    - Balance: $${balance.toLocaleString('es-CL')}

    Proporciona 3 recomendaciones estratégicas y financieras breves para la temporada 2026 en Español.
    Considera si la cuota es realista para el mercado amateur y si nos alcanza para el DT.
    Mantén un tono profesional pero motivador ("Espíritu Juventud").
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "No se pudo generar el consejo estratégico.";
  } catch (error) {
    console.error("Error fetching Gemini advice:", error);
    return "El Asesor Virtual no está disponible. Verifica tu conexión.";
  }
};
