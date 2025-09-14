# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 


    1. 
    Task B Brainstorm
Functionality issues:
- Empty fields are not handled correctly
	- Empty fields are skipped or misinterpreted instead of being returned as empty strings.
-Quoted fields are not handled correctly
	- Commas inside quotes are split into multiple columns and not treated as singular

Extensibility Issues
- There is no header option
	-The Parsers return raw arrays and it can't treat the first row as a header and return key value pairs
- The parser only produces string[][].
	- It doesn't enforce data types or validate inputs like thirty vs 30
- The Parser does not report why it failed
	- If the parser fails, it fails without any reason to why it happened
- Hardcoded onto commas
	- The parser only supports commas as a split which isn't always the case as we saw in class.

LLM added ideas on how the structured error objects with row/column numbers.
The code should also configure delimiters like semicolons or tab

User Story came from both:
As the analyst, I want the parser to correctly handle quoted fields with commas (e.g., `"Alice, Jr."`) so that values containing commas are not split into multiple columns.

Acceptance Criteria:
- Fields wrapped in quotes are parsed as a single value.
- Commas inside quoted fields do not split the field
- Quotes are removed from final parses

User Story 2 came from me
As a coder using the parser, I want the parser to detect when rows have missing or extra fields compared to the header row so that I can avoid processing malformed data.  

Acceptance Criteria:
- The parser validates that each row has the same number of fields as the header (if headers are present).  
- Rows with missing or extra fields trigger a validation error.  
- The error is reported back to the caller, not printed to the console.  

---

 Extensibility  

User Story 3 came from LLM 
As a code developer, I want the parser to provide structured error messages (with row number and reason) so that I can easily debug malformed CSV files.  

Acceptance Criteria:
- Errors include row number and column number (if applicable).  
- The error message clearly describes the issue (e.g., “Unexpected quote at position 12”).  
- Errors are returned in a way that the caller can handle programmatically.  

---


User Story came from both
As a code developer, I want the parser to support different delimiters (e.g., semicolons, tabs) so that I can use it with non-standard CSV formats.  

Acceptance Criteria: 
- The caller can specify a delimiter (default = comma).  
- The parser correctly splits rows using the specified delimiter.  
- Quoted fields still work correctly even if they contain the chosen delimiter.


At first I was focusing on the functionality specifically like handling invalid data types and ignoring the header row. When I used the LLM it mentioned broader ideas like streaming large files, using different configureable delimiters, and adding schema validation. I did not consider those improvements and I went through and found some that I liked and didn't like.
For example, the schema validation seemed like a good idea since it directly improves the usability of the Parser. Other ideas like multi-delimiter support didn't feel as important for this first sprint, but possible for a later one. Overall, the LLM helped me ass a different perspective on the parser in correctness as well as other features that parsers normally contain.

### Design Choices
For the design, I chose to make the parser funciton gneric with a type <T> as the parameter. This will wlloe the caller to use a zod schema that specifies each riw. Then, if the schema is passed the rows are validated and transformed into typed objects. If it doesn;t pass the function falls back to returning plain strings. I chose this design because it makes the parser flexible due to the developers being able to use it for raw data or a specific structure.
### 1340 Supplement

- #### 1. Correctness
A CSV parser is correct if it is able to turn CSV text nito rows and fields in the proper order and types of data without dropping or adding anything. For it to be correct it should also handle every possible inpout like commas, empty values and when a schema is provieded being able to reject the ones that don't match the format.

- #### 2. Random, On-Demand Generation
A random CSV data would expand testing by introducing variations that were not previously thought about and add other combinations possibly finding new bugs or errors. This would ensure the parser is fairly robust and being able to handle different edge cases. 

- #### 3. Overall experience, Bugs encountered and resolved`
This sprint felt different from past projects I have done because of asynchronous file i/o and the addition of schema validation. I ran into bugs with missing geners with type<T>, forgetting to use await in tests, but I was able to work through them and overall gained a better understanding of async behavior and error handling in TypeScript.
#### Errors/Bugs:
Missing <T> generic declaration, String bug in error messages, and needing to tests async since ParseCSV returns a Promise
#### Tests: 
Cerified rows are split properly, Checked consistent number of columns, "Bob, thirty" should fail under a schema requiring a numeric age (will have it be 30 in next sprint), confirmed fall back when a schema is not passed
#### How To…
To use wihtout a schema: awaitparseCSV("people.csv") --> returns string[][].
To use with a schema: await parseCSV("people.csv", PersonRowSchema --> returns Person[])

#### Team members and contributions (include cs logins):
just me josef hatcher

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
copilot
#### Total estimated time it took to complete project: 
around 5 hours
#### Link to GitHub Repo:  
