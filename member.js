function skillsMember() {
    // Get the member's role
    var role = member.role;
    // Check if the member has the role
    if (role == "developer") {
        // Get the member's skills
        var skills = member.skills;
        // Check if the member has skills
        if (skills) {
            // Loop through the member's skills
            for (var i = 0; i < skills.length; i++) {
                // Get the skill
                var skill = skills[i];
                // Display the skill
                console.log("Skill: " + skill);
            }
        }
    }
}