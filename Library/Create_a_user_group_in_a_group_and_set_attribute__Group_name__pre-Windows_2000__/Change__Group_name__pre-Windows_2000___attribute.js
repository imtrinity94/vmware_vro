/**
 * Change "Group name (pre-Windows 2000)" attribute
 *
 * @param {string} groupNamePreWindows2000
 * @param {AD:UserGroup} newGroup
 * @return {AD:UserGroup} newUsergroup
 */
newGroup.setAttribute("sAMAccountName", groupNamePreWindows2000);
newUsergroup = newGroup;