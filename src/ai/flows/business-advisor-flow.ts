'use server';
/**
 * @fileOverview An AI business advisor for SheConnects entrepreneurs.
 *
 * - getBusinessAdvice - A function that provides business advice based on a user's question.
 * - BusinessAdvisorInput - The input type for the getBusinessAdvice function.
 * - BusinessAdvisorOutput - The return type for the getBusinessAdvice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BusinessAdvisorInputSchema = z.object({
  question: z.string().describe('The business-related question from the entrepreneur.'),
  userProfile: z
    .object({
      businessName: z.string().optional(),
      businessStage: z.string().optional(),
      interests: z.array(z.string()).optional(),
      region: z.string().optional(),
    })
    .describe('A summary of the user\'s profile.'),
});
export type BusinessAdvisorInput = z.infer<typeof BusinessAdvisorInputSchema>;

const BusinessAdvisorOutputSchema = z.object({
  advice: z.string().describe('The generated advice, formatted as Markdown.'),
});
export type BusinessAdvisorOutput = z.infer<typeof BusinessAdvisorOutputSchema>;

export async function getBusinessAdvice(input: BusinessAdvisorInput): Promise<BusinessAdvisorOutput> {
  return businessAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'businessAdvisorPrompt',
  input: { schema: BusinessAdvisorInputSchema },
  output: { schema: BusinessAdvisorOutputSchema },
  prompt: `You are an expert business advisor for women entrepreneurs on the SheConnects platform, with a focus on supporting those from rural and underrepresented areas.

An entrepreneur has asked a question. Provide clear, actionable, and encouraging advice.

User Profile Summary:
- Business Name: {{userProfile.businessName}}
- Stage: {{userProfile.businessStage}}
- Interests: {{#each userProfile.interests}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Region: {{userProfile.region}}

User's Question:
"{{{question}}}"

Based on their question and profile, generate a helpful response. The response should be formatted in Markdown.
For example, if they ask about marketing, you could suggest strategies that are effective for rural businesses.
`,
});

const businessAdvisorFlow = ai.defineFlow(
  {
    name: 'businessAdvisorFlow',
    inputSchema: BusinessAdvisorInputSchema,
    outputSchema: BusinessAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
