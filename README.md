# Router ACL and NAT Configuration

This document provides a sample router configuration for implementing **Access Control Lists (ACLs)** and **Network Address Translation (NAT)** in a Cisco network.

---

## 🛡️ Access Control List (ACL 120)

```bash
access-list 120 deny icmp 172.16.0.0 0.0.7.255 10.0.0.0 0.0.0.3 echo
access-list 120 permit icmp any any
access-list 120 permit ip any any
```

**Explanation:**

- `deny icmp ... echo`  
  Blocks ICMP Echo (ping) requests from `172.16.0.0/13` to `10.0.0.0/30`
- `permit icmp any any`  
  Allows all other ICMP traffic
- `permit ip any any`  
  Allows all remaining IP traffic

**Apply ACL to Interface:**

```bash
interface G0/0.30
 ip access-group 120 in
```

---

## 🔄 Static NAT Configuration

```bash
ip nat inside source static 172.16.0.1 10.0.0.1
```

**Explanation:**

- Maps internal IP `172.16.0.1` to external IP `10.0.0.1`

**Define NAT Interfaces:**

```bash
interface G0/0.30
 ip nat inside

interface Serial0/0/1
 ip nat outside
```

---

## ✅ Summary

| Feature | Configuration |
|--------|---------------|
| **ACL** | Blocks ICMP echo from internal (172.16.0.0/13) to public (10.0.0.0/30) |
| **NAT** | Static NAT from `172.16.0.1` → `10.0.0.1` |
| **Inside Interface** | `G0/0.30` |
| **Outside Interface** | `Serial0/0/1` |

---

📌 **Note:** Always test ACL and NAT rules in a lab environment (e.g., Packet Tracer or GNS3) before deploying to production.
