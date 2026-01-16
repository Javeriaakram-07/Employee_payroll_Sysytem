 type="module"
      import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

      const supabase = createClient(
        "https://vknwznfpuzxgzmgxvxvi.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrbnd6bmZwdXp4Z3ptZ3h2eHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0OTM5ODgsImV4cCI6MjA4NDA2OTk4OH0.Y7wX5fHQH_5jiUK5g7O8XanlsMDBqsOarmJA_aTTmxU"
      );

      const table = document.getElementById("deductionTable");
      const msg = document.getElementById("msg");

      /* ---------- LOAD DEDUCTIONS ---------- */
      async function loadDeductions() {
        const { data, error } = await supabase
          .from("deduction")
          .select("*")
          .order("deduct_id");

        table.innerHTML = "";

        if (error) {
          table.innerHTML = `<tr><td colspan="4" class="text-red-500 p-4">${error.message}</td></tr>`;
          return;
        }

        data.forEach((d) => {
          table.insertAdjacentHTML(
            "beforeend",
            `
            <tr class="border-b hover:bg-slate-50">
              <td class="p-3">${d.deduct_id}</td>
              <td class="p-3">${d.deduct_type}</td>
              <td class="p-3">${d.description || "-"}</td>
              <td class="p-3 text-center">
                <button onclick="deleteDeduction(${d.deduct_id})"
                  class="text-red-600 font-semibold hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          `
          );
        });
      }

      loadDeductions();

      /* ---------- ADD DEDUCTION ---------- */
      window.addDeduction = async () => {
        const type = deductType.value.trim();
        const desc = deductDesc.value.trim();

        if (!type) {
          alert("Deduction type required");
          return;
        }

        const { error } = await supabase
          .from("deduction")
          .insert({ deduct_type: type, description: desc });

        if (error) alert(error.message);
        else {
          deductType.value = "";
          deductDesc.value = "";
          loadDeductions();
        }
      };

      /* ---------- DELETE DEDUCTION ---------- */
      window.deleteDeduction = async (id) => {
        if (!confirm("Delete this deduction?")) return;

        const { error } = await supabase
          .from("deduction")
          .delete()
          .eq("deduct_id", id);

        if (error) alert(error.message);
        else loadDeductions();
      };

      /* ---------- ASSIGN DEDUCTION ---------- */
      window.assignDeduction = async () => {
        const empId = document.getElementById("empId").value.trim();
        const deductId = document.getElementById("assignDeductId").value.trim();
        const amount = document.getElementById("amount").value.trim();

        msg.textContent = "";
        msg.className = "mt-3 text-sm";

        if (!empId || !deductId || !amount) {
          msg.textContent = "All fields are required";
          msg.classList.add("text-red-600");
          return;
        }

        const { error } = await supabase.from("employee_deduction").insert({
          emp_id: Number(empId),
          deduct_id: Number(deductId),
          amount: Number(amount),
        });

        if (error) {
          msg.textContent = error.message;
          msg.classList.add("text-red-600");
        } else {
          msg.textContent = "Deduction successfully assigned to employee";
          msg.classList.add("text-green-600");

          document.getElementById("empId").value = "";
          document.getElementById("assignDeductId").value = "";
          document.getElementById("amount").value = "";
        }
      };
   


       type="module"
        
        const btn = document.getElementById("updateBtn");

        btn.addEventListener("click", async () => {
            const username = document.getElementById("username").value.trim();
            const currentPassword = document.getElementById("currentPassword").value.trim();
            const newPassword = document.getElementById("newPassword").value.trim();

            msg.textContent = "";
            msg.className = "text-center text-sm";

            if (!username || !currentPassword || !newPassword) {
                msg.textContent = "All fields are required";
                msg.classList.add("text-red-600");
                return;
            }

            // Verify current password
            const { data, error } = await supabase
                .from("HR_password")
                .select("*")
                .eq("username", username)
                .eq("password", currentPassword)
                .single();

            if (error || !data) {
                msg.textContent = "Invalid username or current password";
                msg.classList.add("text-red-600");
                return;
            }

            // Update password
            const { error: updateError } = await supabase
                .from("HR_password")
                .update({ password: newPassword })
                .eq("username", username);

            if (updateError) {
                msg.textContent = updateError.message;
                msg.classList.add("text-red-600");
            } else {
                msg.textContent = "Password updated successfully!";
                msg.classList.add("text-green-600");

                // clear inputs
                document.getElementById("currentPassword").value = "";
                document.getElementById("newPassword").value = "";
            }
        }); 
      

      /* ---------- LOAD ALLOWANCES ---------- */
      async function loadAllowances() {
        const { data, error } = await supabase
          .from("allowance")
          .select("*")
          .order("allow_id");

        table.innerHTML = "";

        if (error) {
          table.innerHTML = `<tr><td colspan="4" class="text-red-500 p-4">${error.message}</td></tr>`;
          return;
        }

        data.forEach((a) => {
          table.insertAdjacentHTML(
            "beforeend",
            `
                  <tr class="border-b hover:bg-slate-50">
                      <td class="p-3">${a.allow_id}</td>
                      <td class="p-3">${a.allow_type}</td>
                      <td class="p-3">${a.description || "-"}</td>
                      <td class="p-3 text-center">
                          <button onclick="deleteAllowance(${a.allow_id})"
                              class="text-red-600 font-semibold hover:underline">
                              Delete
                          </button>
                      </td>
                  </tr>
              `
          );
        });
      }

      loadAllowances();

      /* ---------- ADD ALLOWANCE ---------- */
      window.addAllowance = async () => {
        const type = allowType.value.trim();
        const desc = allowDesc.value.trim();

        if (!type) {
          alert("Allowance type required");
          return;
        }

        const { error } = await supabase
          .from("allowance")
          .insert({ allow_type: type, description: desc });

        if (error) alert(error.message);
        else loadAllowances();
      };

      /* ---------- DELETE ALLOWANCE ---------- */
      window.deleteAllowance = async (id) => {
        if (!confirm("Delete this allowance?")) return;

        const { error } = await supabase
          .from("allowance")
          .delete()
          .eq("allow_id", id);

        if (error) alert(error.message);
        else loadAllowances();
      };

      /* ---------- ASSIGN ALLOWANCE ---------- */
      window.assignAllowance = async () => {
        const empId = document.getElementById("empId").value.trim();
        const allowId = document.getElementById("assignAllowId").value.trim();
        const amount = document.getElementById("amount").value.trim();

        msg.textContent = "";
        msg.className = "mt-3 text-sm";

        if (!empId || !allowId || !amount) {
          msg.textContent = "All fields are required";
          msg.classList.add("text-red-600");
          return;
        }

        const { error } = await supabase.from("employee_allowance").insert({
          emp_id: Number(empId),
          allow_id: Number(allowId),
          amount: Number(amount),
        });

        if (error) {
          msg.textContent = error.message;
          msg.classList.add("text-red-600");
        } else {
          msg.textContent = "Allowance successfully assigned to employee";
          msg.classList.add("text-green-600");

          // clear inputs
          document.getElementById("empId").value = "";
          document.getElementById("assignAllowId").value = "";
          document.getElementById("amount").value = "";
        }
      };