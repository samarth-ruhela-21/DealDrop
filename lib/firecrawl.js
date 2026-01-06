import Firecrawl from "@mendable/firecrawl-js";
const firecrawl = new Firecrawl({apiKey: process.env.FIRECRAWL_API_KEY})

export async function scrapeProduct(url){
    try{
        const result = await firecrawl.scrape(url, {
            formats: [{
                type: "json",
                schema: {
                    type: "object",
                    required:["productName", "currentPrice"],

                    properties: {
                        productName: {
                            type: "string",
                        },
                        currentPrice:{
                            type: "string"
                        },
                        currencyCode: {
                            type: "string",
                        },
                        productImageUrl: {
                            type: "string",
                        },
                    },
                },
                prompt: 
                    "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
            },
        ],
        });

        const extractData = result.json;

        if(!extractData || !extractData.productName){
            throw new Error("No data extracted from URL");
        }
        return extractData;
    }catch(error){
         console.error("Firecrawl scrape error:", error);
         throw new Error(`Failed to scrape product: ${error.message}`);
    }
}


////////////////////////////////////////////////////////////////////////////////////////

// import Firecrawl from "@mendable/firecrawl-js";

// export async function scrapeProduct(url){
//     try{
//         console.log('🔥 Firecrawl scraping:', url);
//         console.log('🔑 API Key exists?', !!process.env.FIRECRAWL_API_KEY);
        
//         const firecrawl = new Firecrawl({apiKey: process.env.FIRECRAWL_API_KEY});
        
//         // Correct v2 API format
//         const result = await firecrawl.scrape(url, {
//             formats: ['extract'],
//             extract: {
//                 schema: {
//                     type: "object",
//                     properties: {
//                         productName: {
//                             type: "string",
//                             description: "The name of the product"
//                         },
//                         currentPrice: {
//                             type: "string",
//                             description: "The current price as a number without currency symbol"
//                         },
//                         currencyCode: {
//                             type: "string",
//                             description: "Currency code like USD, EUR, INR"
//                         },
//                         productImageUrl: {
//                             type: "string",
//                             description: "Main product image URL"
//                         },
//                     },
//                     required: ["productName", "currentPrice"]
//                 }
//             }
//         });

//         console.log('📦 Full Firecrawl result:', JSON.stringify(result, null, 2));
        
//         // V2 response structure
//         const extractData = result.extract;
        
//         console.log('📋 Extracted data:', extractData);

//         if(!extractData || !extractData.productName || !extractData.currentPrice){
//             throw new Error(`No data extracted from URL`);
//         }
        
//         // Clean the price to remove any non-numeric characters except decimal point
//         const cleanPrice = extractData.currentPrice.toString().replace(/[^\d.]/g, '');
        
//         return {
//             productName: extractData.productName,
//             currentPrice: cleanPrice,
//             currencyCode: extractData.currencyCode || 'INR',
//             productImageUrl: extractData.productImageUrl || null
//         };
        
//     }catch(error){
//          console.error("❌ Firecrawl scrape error:", error);
//          console.error("Error details:", error.response?.data || error.message);
//          throw new Error(`Failed to scrape product: ${error.message}`);
//     }
// }