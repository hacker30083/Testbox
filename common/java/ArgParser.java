public class ArgParser {
    Argument[] flags;
    public class Argument {
        private String name;
        private String description;
        private boolean required;
        private boolean isFlag; // For flags like --verbose

        public Argument(String name, String description, boolean required, boolean isFlag) {
            this.name = name;
            this.description = description;
            this.required = required;
            this.isFlag = isFlag;

            if (isFlag){
                ArgParser.flags
            }
        }

        // Getters and Setters
    }


    /**
     *  parses the arguments based on the
     */
    public void parseArgs(String[] args) {
        if


    }
}
