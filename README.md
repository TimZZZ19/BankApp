Through this project, I practiced more about how to use basic concepts and knowledge in React to build a simple application. I encoutered several new bugs that I never met before, and from these bugs I learned more about how React worked behind the scene. For instance, when one puts alone a setParameter function from calling the useState hook, it creates an infinite loop which crashes the program. Essentially this problem is created by the re-rendering of a component caused by using the hook, so from facing and dealing with this bug personally I had developed a deeper understanding of how React works. To solve this problem, I learned to put the setParameter method inside an if-block, since this if-block runs conditionally, in other words, it won't run everytime the component gets re-rendered, the infinite loop won't be caused. But then, from there new problem appeared. Since this if-block runs conidtionally on a boolean parameter passed in from another component, after entering the if-block, I should access to the boolean parameter and set it to false like turning a switch off so the block won't get run again in the next loop. But since accessing to the boolean parameter involves reaching out to this other component, I have to face another error which says: Cannot update one component while rendering another component. Through Stackover flow, I learned to cope with this issue by wrapping the if-block into an useEffect hook. 
