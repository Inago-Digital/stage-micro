import { normalizeWithSchema } from "@/utils/normalizeWithSchema"
import { ZodType } from "zod"

interface FetchStrapiOptions {
  populate?: string[]
  select?: string[]
  schema?: ZodType<unknown>
}

export async function fetchStrapi<T>(
  endpoint: string,
  { populate = [], select = [], schema }: FetchStrapiOptions = {}
): Promise<T> {
  const generateQueryParams = (params: Record<string, string | boolean>) => {
    const query = new URLSearchParams()
    for (const key in params) {
      if (params[key]) {
        query.append(key, params[key].toString())
      }
    }
    return query.toString()
  }

  const params: Record<string, string | boolean> = {}
  if (populate && populate.length) {
    if (populate.length === 1) {
      params["populate"] = populate[0]
    } else {
      populate.forEach((p, i) => {
        params[`populate[${i}]`] = p
      })
    }
  }
  if (select && select.length) {
    if (select.length === 1) {
      params["fields"] = select[0]
    } else {
      select.forEach((s, i) => {
        params[`fields[${i}]`] = s
      })
    }
  }
  const queryParams = generateQueryParams(params)

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL
  if (!strapiUrl) {
    throw new Error(
      "NEXT_PUBLIC_STRAPI_API_URL is not defined in the environment variables"
    )
  }

  const baseUrl = strapiUrl.endsWith("/") ? strapiUrl.slice(0, -1) : strapiUrl
  const path = endpoint.startsWith("/") ? endpoint : `/api/${endpoint}`
  const fullUrl = queryParams
    ? `${baseUrl}${path}?${queryParams}`
    : `${baseUrl}${path}`

  const res = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("Failed to fetch Strapi data:", res)
    throw new Error(`Failed to fetch Strapi data: ${res.statusText}`)
  }

  const data = await res.json()

  if (!data || !data.data) {
    throw new Error("No data found in the response")
  }

  if (schema) {
    const res = normalizeWithSchema(schema, data.data)
    if (res.success) {
      return res.data as T
    }
    if (res.error) {
      console.error("Error validating data with schema:", res.error)
      throw new Error("Data validation failed")
    }
  }

  return data.data as T
}
