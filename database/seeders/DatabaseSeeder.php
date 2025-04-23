<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Create roles
        $roles = [
            ['name' => 'administrator', 'description' => 'General admin avec toot privileges'],
            ['name' => 'employee', 'description' => 'un employe avec des privileges restreints'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        // Seed Services Table
        DB::table('services')->insert([
            ['name' => 'Service d\'administration', 'description' => 'service professionnel d\'administration'],
            ['name' => 'Service de nettoyage', 'description' => 'service professionnel de nettoyage'],
            ['name' => 'Service de maintenance', 'description' => 'service professionnel de maintenance'],
            ['name' => 'Service de sécurité', 'description' => 'service professionnel de sécurité'],
            ['name' => 'Service de livraison', 'description' => 'service professionnel de livraison'],
            ['name' => 'Service d\'assistance technique', 'description' => 'service professionnel d\'assistance technique'],
            ['name' => 'Service de gestion des stocks', 'description' => 'service professionnel de gestion des stocks'],
            ['name' => 'Service de vente', 'description' => 'service professionnel de vente'],
            ['name' => 'Service de marketing', 'description' => 'service professionnel de marketing'],
            ['name' => 'Service de comptabilité', 'description' => 'service professionnel de comptabilité'],
            ['name' => 'Service juridique', 'description' => 'service professionnel juridique'],
            ['name' => 'Service de ressources humaines', 'description' => 'service professionnel de ressources humaines'],
            ['name' => 'Service informatique', 'description' => 'service professionnel informatique'],
            ['name' => 'Service de communication', 'description' => 'service professionnel de communication'],
            ['name' => 'Service d\'événementiel', 'description' => 'service professionnel d\'événementiel'],
            ['name' => 'Service de design graphique', 'description' => 'service professionnel de design graphique'],
            ['name' => 'Service de photographie', 'description' => 'service professionnel de photographie'],
            ['name' => 'Service de vidéographie', 'description' => 'service professionnel de vidéographie'],
            ['name' => 'Service de traduction', 'description' => 'service professionnel de traduction'],
            ['name' => 'Service de rédaction', 'description' => 'service professionnel de rédaction'],
            ['name' => 'Service d\'édition', 'description' => 'service professionnel d\'édition'],
            ['name' => 'Service de relations publiques', 'description' => 'service professionnel de relations publiques'],
        ]);

        // Seed Users Table
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 1, // admin role
                'service_id' => 1,
            ],
            [
                'name' => 'user 1',
                'email' => 'user1@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, 
                'service_id' => 3, 
            ],
            [
                'name' => 'user 199',
                'email' => 'user199@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, 
                'service_id' => 3, 
            ],
            [
                'name' => 'user 47',
                'email' => 'user47@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, 
                'service_id' => 3, 
            ],
            [
                'name' => 'user 265',
                'email' => 'user265@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, 
                'service_id' => 3, 
            ],
            [
                'name' => 'user 904',
                'email' => 'user904@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, 
                'service_id' => 3, 
            ],
            [
                'name' => 'user 2',
                'email' => 'user2@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 2,
            ],
            [
                'name' => 'user 23',
                'email' => 'user23@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 2,
            ],
            [
                'name' => 'user 56',
                'email' => 'user56@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 2,
            ],
            [
                'name' => 'user 3',
                'email' => 'user3@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 5,
            ],
            [
                'name' => 'user 4',
                'email' => 'user5@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 7,
            ],
            [
                'name' => 'user 5',
                'email' => 'user6@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 8, 
            ],
            [
                'name' => 'user 6',
                'email' => 'user7@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 9,
            ],
            [
                'name' => 'user 7',
                'email' => 'user8@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 10,
            ],
            [
                'name' => 'user 8',
                'email' => 'user9@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 11,
            ],
            [
                'name' => 'user 9',
                'email' => 'user10@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // user role
                'service_id' => 12,
            ],
        ]);

        // Seed Products Table
        DB::table('products')->insert([
            [
                'name' => 'Laptop - Dell XPS 15',
                'serial_number' => 'LAP-001',
                'supplier' => 'Dell Inc.',
                'price' => 1899.99,
                'served_to' => 1,
            ],
            [
                'name' => 'Mechanical Keyboard - Keychron K6',
                'serial_number' => 'KB-001',
                'supplier' => 'Keychron',
                'price' => 89.99,
                'served_to' => 2,
            ],
            [
                'name' => 'Wireless Mouse - Logitech MX Master 3',
                'serial_number' => 'MOU-001',
                'supplier' => 'Logitech',
                'price' => 99.99,
                'served_to' => 4,
            ],
            [
                'name' => 'Monitor - LG UltraFine 27" 4K',
                'serial_number' => 'MON-001',
                'supplier' => 'LG Electronics',
                'price' => 549.99,
                'served_to' => 6,
            ],
            [
                'name' => 'External SSD - Samsung T7 1TB',
                'serial_number' => 'SSD-001',
                'supplier' => 'Samsung',
                'price' => 129.99,
                'served_to' => 3,
            ],
            [
                'name' => 'Webcam - Logitech C920',
                'serial_number' => 'CAM-001',
                'supplier' => 'Logitech',
                'price' => 79.99,
                'served_to' => 5,
            ],
            [
                'name' => 'Router - TP-Link AX6000',
                'serial_number' => 'ROU-001',
                'supplier' => 'TP-Link',
                'price' => 249.99,
                'served_to' => 7,
            ],
            [
                'name' => 'Headphones - Sony WH-1000XM4',
                'serial_number' => 'HP-001',
                'supplier' => 'Sony',
                'price' => 349.99,
                'served_to' => 8,
            ],
            [
                'name' => 'Graphics Tablet - Wacom Intuos Pro',
                'serial_number' => 'TAB-001',
                'supplier' => 'Wacom',
                'price' => 379.99,
                'served_to' => 9,
            ],
            [
                'name' => 'Docking Station - CalDigit TS4',
                'serial_number' => 'DOC-001',
                'supplier' => 'CalDigit',
                'price' => 349.99,  
                'served_to' => 10,
            ],
            [
                'name' => 'NAS Storage - Synology DS920+',
                'serial_number' => 'NAS-001',
                'supplier' => 'Synology',
                'price' => 549.99,
                'served_to' => 3,
            ],
            [
                'name' => 'USB-C Hub - Anker PowerExpand 8-in-1',
                'serial_number' => 'HUB-001',
                'supplier' => 'Anker',
                'price' => 79.99,
                'served_to' => 4,
            ],
            [
                'name' => 'Portable Projector - Anker Nebula Capsule II',
                'serial_number' => 'PROJ-001',
                'supplier' => 'Anker',
                'price' => 469.99,
                'served_to' => 5,
            ],
            [
                'name' => 'Microphone - Shure SM7B',
                'serial_number' => 'MIC-001',
                'supplier' => 'Shure',
                'price' => 399.99,
                'served_to' => 6,
            ],
            [
                'name' => 'Server Rack - StarTech 42U',
                'serial_number' => 'SRV-001',
                'supplier' => 'StarTech',
                'price' => 1299.99,
                'served_to' => 7,
            ],
            [
                'name' => 'Wireless Charger - Belkin BoostCharge',
                'serial_number' => 'WC-001',
                'supplier' => 'Belkin',
                'price' => 49.99,
                'served_to' => 8,
            ],
            [
                'name' => 'Smart Speaker - Amazon Echo Dot (5th Gen)',
                'serial_number' => 'SPK-001',
                'supplier' => 'Amazon',
                'price' => 49.99,
                'served_to' => 9,
            ]
        ]);

        // Seed Actions Table
        DB::table('actions')->insert([
            [
                'product_id' => 1, // Mop
                'user_id' => 1, // Admin User
                'action' => 'moved',
                'details' => 'Moved 10 mops from Cleaning Service to Maintenance Service',
            ],
            [
                'product_id' => 2, // Broom
                'user_id' => 2, // Editor User
                'action' => 'moved',
                'details' => 'Moved 5 brooms from Cleaning Service to Maintenance Service',
            ],
        ]);

        // Seed Notifications Table
        DB::table('notifications')->insert([
            [
                'user_id' => 1, // Admin User
                'type' => 'info',
                'message' => 'A new product has been added to the inventory.',
                'is_read' => false,
            ],
            [
                'user_id' => 2, // Editor User
                'type' => 'warning',
                'message' => 'Low stock alert for Mop (SN-001).',
                'is_read' => false,
            ],
        ]);

        // Seed Help Requests Table
        DB::table('help_requests')->insert([
            [
                'user_id'    => 2, // user 1? (adjust according to your seed data)
                'product_id' => 1, // Laptop - Dell XPS 15
                'description'=> 'My laptop is overheating. Need immediate support.',
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id'    => 2, // using user 2 or user 3, depending on your logic
                'product_id' => 3, // Wireless Mouse - Logitech MX Master 3
                'description'=> 'The mouse stopped clicking altogether.',
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id'    => 3, // using user 2 or user 3, depending on your logic
                'product_id' => 4, // Wireless Mouse - Logitech MX Master 3
                'description'=> 'The mouse stopped clicking altogether.',
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id'    => 3, // using user 2 or user 3, depending on your logic
                'product_id' => 7, // Wireless Mouse - Logitech MX Master 3
                'description'=> 'The mouse stopped clicking altogether.',
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id'    => 2, // using user 2 or user 3, depending on your logic
                'product_id' => 9, // Wireless Mouse - Logitech MX Master 3
                'description'=> 'The mouse stopped clicking altogether.',
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id'    => 3, // using user 2 or user 3, depending on your logic
                'product_id' => 12, // Wireless Mouse - Logitech MX Master 3
                'description'=> 'The mouse stopped clicking altogether.',
                'status'     => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id'    => 2,
                'product_id' => 2, // Mechanical Keyboard - Keychron K6
                'description'=> 'Keyboard is unresponsive after the spill.',
                'status'     => 'resolved', // example with different status
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);


    }
}
