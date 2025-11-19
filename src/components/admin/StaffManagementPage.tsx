import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowLeft, Plus, Edit, Trash2, Search, Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface StaffManagementPageProps {
  onBack: () => void;
  onLogout: () => void;
  user: { email: string; name: string };
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive";
  hireDate: string;
  salary: number;
}

export function StaffManagementPage({ onBack, onLogout }: StaffManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Chinedu Okafor",
      email: "chinedu@freshmart.com",
      phone: "+234 801 234 5678",
      role: "chef",
      status: "active",
      hireDate: "2023-01-15",
      salary: 3500
    },
    {
      id: "2",
      name: "Amina Ibrahim",
      email: "amina@freshmart.com",
      phone: "+234 802 345 6789",
      role: "chef",
      status: "active",
      hireDate: "2023-03-20",
      salary: 3200
    },
    {
      id: "3",
      name: "Oluwaseun Adeyemi",
      email: "seun@freshmart.com",
      phone: "+234 803 456 7890",
      role: "server",
      status: "active",
      hireDate: "2023-06-10",
      salary: 2200
    },
    {
      id: "4",
      name: "Fatima Mohammed",
      email: "fatima@freshmart.com",
      phone: "+234 804 567 8901",
      role: "server",
      status: "active",
      hireDate: "2023-08-05",
      salary: 2000
    },
    {
      id: "5",
      name: "Emeka Nwosu",
      email: "emeka@freshmart.com",
      phone: "+234 805 678 9012",
      role: "delivery",
      status: "active",
      hireDate: "2023-09-12",
      salary: 1800
    },
    {
      id: "6",
      name: "Blessing Okoro",
      email: "blessing@freshmart.com",
      phone: "+234 806 789 0123",
      role: "manager",
      status: "active",
      hireDate: "2022-11-01",
      salary: 4500
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "server",
    status: "active" as "active" | "inactive",
    hireDate: "",
    salary: ""
  });

  const roles = [
    { value: "all", label: "All Roles" },
    { value: "chef", label: "Chef" },
    { value: "server", label: "Server" },
    { value: "delivery", label: "Delivery" },
    { value: "manager", label: "Manager" },
    { value: "cashier", label: "Cashier" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.hireDate || !formData.salary) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingStaff) {
      // Update existing staff
      setStaffMembers(prev => prev.map(staff =>
        staff.id === editingStaff.id
          ? { ...staff, ...formData, salary: parseFloat(formData.salary) }
          : staff
      ));
      toast.success("Staff member updated successfully!");
    } else {
      // Add new staff
      const newStaff: StaffMember = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        hireDate: formData.hireDate,
        salary: parseFloat(formData.salary)
      };
      setStaffMembers(prev => [...prev, newStaff]);
      toast.success("Staff member added successfully!");
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "server",
      status: "active",
      hireDate: "",
      salary: ""
    });
    setEditingStaff(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      status: staff.status,
      hireDate: staff.hireDate,
      salary: staff.salary.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setStaffMembers(prev => prev.filter(staff => staff.id !== id));
    toast.success("Staff member removed successfully!");
  };

  const toggleStatus = (id: string) => {
    setStaffMembers(prev => prev.map(staff =>
      staff.id === id
        ? { ...staff, status: staff.status === "active" ? "inactive" : "active" }
        : staff
    ));
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || staff.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "chef": return "bg-orange-100 text-orange-800";
      case "manager": return "bg-purple-100 text-purple-800";
      case "server": return "bg-blue-100 text-blue-800";
      case "delivery": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl">Staff Management</h1>
                <p className="text-sm text-muted-foreground">Manage your team members</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Staff</p>
              <p className="text-3xl">{staffMembers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Active</p>
              <p className="text-3xl text-green-600">
                {staffMembers.filter(s => s.status === "active").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Chefs</p>
              <p className="text-3xl">{staffMembers.filter(s => s.role === "chef").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Payroll</p>
              <p className="text-3xl">
                ${staffMembers.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingStaff(null);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  role: "server",
                  status: "active",
                  hireDate: "",
                  salary: ""
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingStaff ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chef">Chef</SelectItem>
                        <SelectItem value="server">Server</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="cashier">Cashier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hireDate">Hire Date *</Label>
                    <Input
                      id="hireDate"
                      type="date"
                      value={formData.hireDate}
                      onChange={(e) => handleInputChange("hireDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="salary">Monthly Salary ($) *</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => handleInputChange("salary", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingStaff ? "Update Staff" : "Add Staff"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Staff List */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStaff.map(staff => (
                <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium">{staff.name}</h3>
                      <Badge className={getRoleBadgeColor(staff.role)}>
                        {staff.role}
                      </Badge>
                      <Badge className={staff.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {staff.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {staff.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {staff.phone}
                      </span>
                      <span>Hired: {new Date(staff.hireDate).toLocaleDateString()}</span>
                      <span className="font-medium">${staff.salary}/month</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => toggleStatus(staff.id)}>
                      {staff.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(staff)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(staff.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredStaff.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No staff members found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
