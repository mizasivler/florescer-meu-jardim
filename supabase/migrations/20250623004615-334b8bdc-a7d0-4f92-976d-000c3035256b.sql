
-- PRIORITY 1: Fix Critical Storage Security for avatars bucket
-- Recreate comprehensive RLS policies for storage.objects (avatars bucket)

-- Remove existing policies to avoid conflicts
drop policy if exists "Authenticated users can upload to avatars" on storage.objects;
drop policy if exists "Authenticated users can update their own avatars" on storage.objects;
drop policy if exists "Authenticated users can delete their own avatars" on storage.objects;
drop policy if exists "Anyone can select avatars" on storage.objects;

-- 1. Allow authenticated users to upload files to avatars bucket
create policy "Users can upload to avatars bucket"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars' and auth.uid() is not null);

-- 2. Allow users to view only their own avatar files + public read for display
create policy "Users can view avatars"
on storage.objects for select
using (bucket_id = 'avatars' and (auth.uid() = owner or auth.role() = 'anon'));

-- 3. Allow users to update only their own avatar files
create policy "Users can update own avatars"
on storage.objects for update
to authenticated
using (bucket_id = 'avatars' and auth.uid() = owner);

-- 4. Allow users to delete only their own avatar files
create policy "Users can delete own avatars"
on storage.objects for delete
to authenticated
using (bucket_id = 'avatars' and auth.uid() = owner);

-- PRIORITY 2: Add missing DELETE policy for profiles table
create policy "Users can delete their own profile"
on public.profiles for delete
to authenticated
using (auth.uid() = id);

-- PRIORITY 3: Add avatar_url column to profiles table if not exists
alter table public.profiles add column if not exists avatar_url text;

-- Add index for performance on avatar_url lookups
create index if not exists idx_profiles_avatar_url on public.profiles(avatar_url);
