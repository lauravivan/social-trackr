import { octokit } from "../api/client";

async function getPaginatedData(url: any) {
    const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
    let pagesRemaining: any = true;
    let data: any = [];
  
    while (pagesRemaining) {
      const response = await octokit.request(`GET ${url}`, {
        per_page: 100,
      });
  
      const parsedData = parseData(response.data)
      data = [...data, ...parsedData];
  
      const linkHeader: any = response.headers.link;
  
      pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);
  
      if (pagesRemaining) {
        if (linkHeader) {
            url = linkHeader.match(nextPattern)[0];
        }
      }
    }
  
    return data;
}

function parseData(data: any) {
      if (Array.isArray(data)) {
        return data
      }
  
    if (!data) {
      return []
    }
  
    delete data.incomplete_results;
    delete data.repository_selection;
    delete data.total_count;

    const namespaceKey = Object.keys(data)[0];
    data = data[namespaceKey];
  
    return data;
  }

export async function getAllProfileFollowers(profile: string) {
    const followers = await getPaginatedData(`/users/${profile}/followers`);
    return followers;
}

export async function getAllProfileFollowing(profile: string) {
    const following = await getPaginatedData(`/users/${profile}/following`);
    return following;
}

