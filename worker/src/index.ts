
import {createClient} from "redis"


const client = createClient();


interface Problem {
    problemId: string;
    userId : string;
    code : string;
    language : string;
}

async function processSubmission(problems: string){
    const {problemId, userId, code, language}: Problem = JSON.parse(problems);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`User: ${userId}`); 
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);


    // Run the code here


    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(`Submission for problemId ${problemId} processed.`);

    client.publish("problem_done", JSON.stringify({problemId, status : "TLE"}));
}



async function startWorker(){
   try {
    await client.connect();

    console.log("Redis Client is Connected");

    while(1){
        try {
            const problems = await client.brPop("problems", 0);
            console.log(typeof problems)
            console.log(problems)
            // run the code here
            
            await processSubmission(problems?.element ?? "")

        } catch (error) {
            console.log("Error in Fetching the Problem", error)            
        }
    }
   } catch (error) {
         console.error("Redis Connection Error", error)
   }
};


startWorker()