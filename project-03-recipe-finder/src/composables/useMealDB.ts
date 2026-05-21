const BASE = 'https://www.themealdb.com/api/json/v1/1'

export interface MealSummary {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory?: string
  strArea?: string
}

export interface MealDetail extends MealSummary {
  strInstructions: string
  strCategory: string
  strArea: string
  strTags: string | null
  strYoutube: string | null
  strSource: string | null
  [key: string]: string | null | undefined
}

export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

export interface Area {
  strArea: string
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function searchByName(term: string): Promise<MealSummary[]> {
  const data = await fetchJSON<{ meals: MealSummary[] | null }>(`${BASE}/search.php?s=${encodeURIComponent(term)}`)
  return data.meals ?? []
}

export async function filterByCategory(category: string): Promise<MealSummary[]> {
  const data = await fetchJSON<{ meals: MealSummary[] | null }>(`${BASE}/filter.php?c=${encodeURIComponent(category)}`)
  return data.meals ?? []
}

export async function filterByArea(area: string): Promise<MealSummary[]> {
  const data = await fetchJSON<{ meals: MealSummary[] | null }>(`${BASE}/filter.php?a=${encodeURIComponent(area)}`)
  return data.meals ?? []
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJSON<{ categories: Category[] }>(`${BASE}/categories.php`)
  return data.categories ?? []
}

export async function getAreas(): Promise<Area[]> {
  const data = await fetchJSON<{ meals: Area[] }>(`${BASE}/list.php?a=list`)
  return data.meals ?? []
}

export async function getRandomMeal(): Promise<MealDetail | null> {
  const data = await fetchJSON<{ meals: MealDetail[] | null }>(`${BASE}/random.php`)
  return data.meals?.[0] ?? null
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  const data = await fetchJSON<{ meals: MealDetail[] | null }>(`${BASE}/lookup.php?i=${id}`)
  return data.meals?.[0] ?? null
}

export function extractIngredients(meal: MealDetail): { ingredient: string; measure: string }[] {
  const ingredients: { ingredient: string; measure: string }[] = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: (measure ?? '').trim(),
      })
    }
  }
  return ingredients
}
